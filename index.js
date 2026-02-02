const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const passport = require("passport");

const Models = require("./models");
const Users = Models.User;
const Movies = Models.Movie;

const app = express();

// ==============================
// MIDDLEWARE
// ==============================
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files from /public
// Example: public/heat.png -> http://localhost:8080/heat.png
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// ==============================
// DB CONNECTION
// ==============================
const CONNECTION_URI =
  process.env.CONNECTION_URI || "mongodb://localhost:27017/myflixDB";

mongoose
  .connect(CONNECTION_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err));

// ==============================
// AUTH
// ==============================
require("./passport");
app.use(passport.initialize());
require("./auth")(app);

// ==============================
// ROUTES
// ==============================

// Home
app.get("/", (req, res) => {
  res.send("Welcome to myFlix API!");
});

// ✅ Optional: quick sanity check route for static files
// app.get("/health", (req, res) => res.json({ ok: true }));

// Protected GET user
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await Users.findOne({ Username: req.params.Username }).select(
        "-Password -__v"
      );

      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

// Create user
app.post(
  "/users",
  [
    check("Username").isLength({ min: 5 }).isAlphanumeric(),
    check("Password").not().isEmpty(),
    check("Email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const hashedPassword = Users.hashPassword(req.body.Password);
      const user = await Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      });

      const cleanUser = user.toObject();
      delete cleanUser.Password;

      return res.status(201).json(cleanUser);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

// ==============================
// MOVIE ENDPOINTS
// ==============================

// Get all movies
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const movies = await Movies.find();
      return res.status(200).json(movies);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

// Get a movie by title
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const movie = await Movies.findOne({ Title: req.params.Title });
      if (!movie) return res.status(404).json({ message: "Movie not found" });
      return res.json(movie);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

// Get genre info by genre name
app.get(
  "/movies/genres/:Name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const movie = await Movies.findOne({ "Genre.Name": req.params.Name });
      if (!movie) return res.status(404).json({ message: "Genre not found" });

      return res.json(movie.Genre);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

// Get director info by director name
app.get(
  "/movies/directors/:Name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const movie = await Movies.findOne({ "Director.Name": req.params.Name });
      if (!movie) return res.status(404).json({ message: "Director not found" });

      return res.json(movie.Director);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

// ==============================
// USER UPDATE + FAVORITES
// ==============================

// Update user
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  [
    check("Username").optional().isLength({ min: 5 }).isAlphanumeric(),
    check("Password").optional().not().isEmpty(),
    check("Email").optional().isEmail(),
  ],
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(403).json({ message: "Permission denied" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const update = { ...req.body };

      if (update.Password) {
        update.Password = Users.hashPassword(update.Password);
      }

      const updatedUser = await Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $set: update },
        { new: true }
      ).select("-Password -__v");

      if (!updatedUser) return res.status(404).json({ message: "User not found" });

      return res.json(updatedUser);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

// Add movie to favorites
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(403).json({ message: "Permission denied" });
    }

    try {
      const updatedUser = await Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $addToSet: { FavoriteMovies: req.params.MovieID } },
        { new: true }
      ).select("-Password -__v");

      if (!updatedUser) return res.status(404).json({ message: "User not found" });

      return res.json(updatedUser);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

// Remove movie from favorites
app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(403).json({ message: "Permission denied" });
    }

    try {
      const updatedUser = await Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $pull: { FavoriteMovies: req.params.MovieID } },
        { new: true }
      ).select("-Password -__v");

      if (!updatedUser) return res.status(404).json({ message: "User not found" });

      return res.json(updatedUser);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

// Deregister user
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(403).json({ message: "Permission denied" });
    }

    try {
      const deletedUser = await Users.findOneAndDelete({
        Username: req.params.Username,
      });

      if (!deletedUser) return res.status(404).json({ message: "User not found" });

      return res.status(200).json({ message: "User deleted" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

// ==============================
// SERVER START
// ==============================
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`🚀 Listening on port ${port}`));
