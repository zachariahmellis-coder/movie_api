// index.js
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { Movie, User } from "./models.js";

const app = express();
const PORT = process.env.PORT || 3000;

// --------------------
// Middleware
// --------------------
app.use(morgan("common"));
app.use(express.json());

// Serve static files from /public
app.use(express.static("public"));

// Friendly docs route
app.get("/documentation", (req, res) => res.redirect("/documentation.html"));

// --------------------
// MongoDB Connection
// --------------------
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myflixDB";

await mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// --------------------
// Health Check
// --------------------
app.get("/health", (req, res) => {
  const state = mongoose.connection.readyState; // 1 = connected
  res.json({ ok: state === 1, mongoState: state });
});

// --------------------
// MOVIES
// --------------------

// Get all movies
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// Get movie by title (case-insensitive exact match)
app.get("/movies/:title", async (req, res) => {
  try {
    const movie = await Movie.findOne({
      Title: { $regex: `^${req.params.title}$`, $options: "i" },
    });

    if (!movie) return res.status(404).send("Movie not found");
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// Get genre by name (case-insensitive exact match)
app.get("/genres/:name", async (req, res) => {
  try {
    const movie = await Movie.findOne({
      "Genre.Name": { $regex: `^${req.params.name}$`, $options: "i" },
    });

    if (!movie) return res.status(404).send("Genre not found");
    res.json(movie.Genre);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// Get director by name (case-insensitive exact match)
app.get("/directors/:name", async (req, res) => {
  try {
    const movie = await Movie.findOne({
      "Director.Name": { $regex: `^${req.params.name}$`, $options: "i" },
    });

    if (!movie) return res.status(404).send("Director not found");
    res.json(movie.Director);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// --------------------
// USERS
// --------------------

// Register a new user
app.post("/users", async (req, res) => {
  try {
    const existingUser = await User.findOne({ Username: req.body.Username });
    if (existingUser)
      return res.status(400).send(req.body.Username + " already exists");

    const newUser = await User.create({
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// Update user info (by Username param)
app.put("/users/:username", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).send("User not found");
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// Add favorite movie (ObjectId) - returns populated favorites
app.post("/users/:username/movies/:movieId", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.username },
      { $addToSet: { FavoriteMovies: req.params.movieId } },
      { new: true }
    ).populate("FavoriteMovies");

    if (!updatedUser) return res.status(404).send("User not found");
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// Remove favorite movie (ObjectId) - returns populated favorites
app.delete("/users/:username/movies/:movieId", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.username },
      { $pull: { FavoriteMovies: req.params.movieId } },
      { new: true }
    ).populate("FavoriteMovies");

    if (!updatedUser) return res.status(404).send("User not found");
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// Deregister (delete) user
app.delete("/users/:username", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      Username: req.params.username,
    });

    if (!deletedUser) return res.status(404).send("User not found");
    res.send(req.params.username + " was deleted.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// Get all users (with populated favorites)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().populate("FavoriteMovies");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// --------------------
// Root Route
// --------------------
app.get("/", (req, res) => {
  res.send("myFlix API is running ✅  Try /movies or /users");
});

// --------------------
// Start Server
// --------------------
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// --------------------
// Graceful Shutdown
// --------------------
const shutdown = async () => {
  console.log("\nShutting down server...");
  await mongoose.connection.close();
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
