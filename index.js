// index.js (ESM) — FULL DROP-IN (Exercise 2.9 ready)
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import passport from "passport";

import { Movie, User } from "./models.js";
import "./passport.js";       // registers Local + JWT strategies
import auth from "./auth.js"; // mounts POST /login

const app = express();
const PORT = process.env.PORT || 3000;

// --------------------
// Middleware
// --------------------
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // important for Postman form params
app.use(express.static("public"));

// Mount /login
auth(app);

// JWT middleware shortcut
const requireJWT = passport.authenticate("jwt", { session: false });

// --------------------
// Public routes
// --------------------
app.get("/documentation", (req, res) => res.redirect("/documentation.html"));

app.get("/health", (req, res) => {
  const state = mongoose.connection.readyState; // 1 = connected
  res.json({ ok: state === 1, mongoState: state });
});

app.get("/", (req, res) => {
  res.send("myFlix API is running ✅");
});

// --------------------
// MongoDB Connection
// --------------------
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myflixDB";

await mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// --------------------
// MOVIES (PROTECTED)
// --------------------

// Get all movies
app.get("/movies", requireJWT, async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// Get movie by title (case-insensitive exact match)
app.get("/movies/:title", requireJWT, async (req, res) => {
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
app.get("/genres/:name", requireJWT, async (req, res) => {
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
app.get("/directors/:name", requireJWT, async (req, res) => {
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

// Register a new user (PUBLIC — do not protect, or nobody can sign up)
app.post("/users", async (req, res) => {
  try {
    const existingUser = await User.findOne({ Username: req.body.Username });
    if (existingUser) return res.status(400).send(req.body.Username + " already exists");

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

// Get all users (PROTECTED)
app.get("/users", requireJWT, async (req, res) => {
  try {
    const users = await User.find().populate("FavoriteMovies");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// Get ONE user (PROTECTED + authz check)
app.get("/users/:username", requireJWT, async (req, res) => {
  try {
    if (req.user.Username !== req.params.username) {
      return res.status(403).send("Permission denied");
    }

    const user = await User.findOne({ Username: req.params.username }).populate("FavoriteMovies");
    if (!user) return res.status(404).send("User not found");

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

// Update user (PROTECTED + authz check)
app.put("/users/:username", requireJWT, async (req, res) => {
  try {
    // Must be updating yourself
    if (req.user.Username !== req.params.username) {
      return res.status(403).send("Permission denied");
    }

    // Optional safety: prevent changing Username via body (keeps auth simple)
    if (req.body.Username && req.body.Username !== req.params.username) {
      return res.status(400).send("Username changes not allowed");
    }

    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.username },
      {
        $set: {
          // Keep Username stable; update other fields
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

// Add favorite movie (PROTECTED + authz check)
app.post("/users/:username/movies/:movieId", requireJWT, async (req, res) => {
  try {
    if (req.user.Username !== req.params.username) {
      return res.status(403).send("Permission denied");
    }

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

// Remove favorite movie (PROTECTED + authz check)
app.delete("/users/:username/movies/:movieId", requireJWT, async (req, res) => {
  try {
    if (req.user.Username !== req.params.username) {
      return res.status(403).send("Permission denied");
    }

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

// Delete user (PROTECTED + authz check)
app.delete("/users/:username", requireJWT, async (req, res) => {
  try {
    if (req.user.Username !== req.params.username) {
      return res.status(403).send("Permission denied");
    }

    const deletedUser = await User.findOneAndDelete({ Username: req.params.username });
    if (!deletedUser) return res.status(404).send("User not found");

    res.send(req.params.username + " was deleted.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
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
