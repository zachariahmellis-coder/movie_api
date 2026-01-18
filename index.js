// index.js
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

const Models = require("./models.js");
const Movies = Models.Movie; // (unused here but kept for your future routes)
const Users = Models.User;

const app = express();

// -------------------
// Middleware
// -------------------
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow all origins (CareerFoundry usually accepts this for the assignment)
app.use(cors());

// -------------------
// MongoDB Connection
// -------------------
const connectionUri =
  process.env.CONNECTION_URI || "mongodb://localhost:27017/myFlixDB";

mongoose
  .connect(connectionUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// -------------------
// Auth / Passport
// -------------------
require("./passport"); // registers strategies
const passport = require("passport");
require("./auth")(app); // adds /login route

// -------------------
// Routes
// -------------------
app.get("/", (req, res) => {
  res.send("Welcome to myFlix API!");
});

// ✅ GET /users/:Username (protected)
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await Users.findOne({ Username: req.params.Username });
      if (!user) return res.status(404).json({ message: "User not found" });

      // don't return hashed password
      const userObj = user.toObject();
      delete userObj.Password;

      return res.json(userObj);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error: " + err);
    }
  }
);

// ✅ POST /users (create user) with validation + hashing
app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non-alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    try {
      const hashedPassword = Users.hashPassword(req.body.Password);

      const existingUser = await Users.findOne({ Username: req.body.Username });
      if (existingUser)
        return res.status(400).send(req.body.Username + " already exists");

      const newUser = await Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      });

      // optional: don't return hashed password
      const userObj = newUser.toObject();
      delete userObj.Password;

      return res.status(201).json(userObj);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error: " + err);
    }
  }
);

// ✅ PUT /users/:Username (update user) protected + validation (+ hash if password is being changed)
app.put(
  "/users/:Username",
  [
    check("Username", "Username must be at least 5 characters long")
      .optional()
      .isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non-alphanumeric characters - not allowed."
    )
      .optional()
      .isAlphanumeric(),
    check("Password", "Password is required").optional().not().isEmpty(),
    check("Email", "Email does not appear to be valid").optional().isEmail(),
  ],
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    try {
      const update = { ...req.body };

      // If they sent a Password, hash it before saving
      if (update.Password) {
        update.Password = Users.hashPassword(update.Password);
      }

      const updatedUser = await Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $set: update },
        { new: true }
      );

      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });

      // optional: don't return hashed password
      const userObj = updatedUser.toObject();
      delete userObj.Password;

      return res.json(userObj);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error: " + err);
    }
  }
);

// -------------------
// Start server (Heroku-safe)
// -------------------
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
