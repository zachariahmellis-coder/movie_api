// index.js
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;

const passport = require("passport");
require("./passport");          // registers strategies
require("./auth")(express);     // <-- DO NOT do this (leads to weird issues)
// ✅ Correct: require auth after app exists (see below)

const app = express();

// Middleware
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (all origins)
app.use(cors());

// MongoDB connection (Heroku uses CONNECTION_URI)
const connectionUri =
  process.env.CONNECTION_URI || "mongodb://localhost:27017/myflixDB";

mongoose
  .connect(connectionUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Register /login route
require("./auth")(app);

// Home
app.get("/", (req, res) => {
  res.send("Welcome to myFlix API!");
});

/**
 * ✅ GET /users/:Username (protected)
 * Optional “self-only” guard included.
 */
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Optional: only let users access their own record
      if (req.user.Username !== req.params.Username) {
        return res
          .status(403)
          .json({ message: "You can only access your own user data." });
      }

      const user = await Users.findOne({ Username: req.params.Username })
        .select("-Password -__v");

      if (!user) return res.status(404).json({ message: "User not found" });

      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error: " + err });
    }
  }
);

/**
 * ✅ POST /users (create user) with hashing + validation
 */
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

      const userObj = newUser.toObject();
      delete userObj.Password;
      delete userObj.__v;

      return res.status(201).json(userObj);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error: " + err);
    }
  }
);

/**
 * ✅ PUT /users/:Username (protected) with validation + optional password hashing
 */
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
      // Optional: only let users update themselves
      if (req.user.Username !== req.params.Username) {
        return res
          .status(403)
          .json({ message: "You can only update your own user data." });
      }

      const update = { ...req.body };

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

      const userObj = updatedUser.toObject();
      delete userObj.Password;
      delete userObj.__v;

      return res.json(userObj);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Error: " + err);
    }
  }
);

// ✅ Heroku-safe port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
