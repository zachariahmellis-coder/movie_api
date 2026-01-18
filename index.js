const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const passport = require("passport");

const Models = require("./models");
const Users = Models.User;

const app = express();

// Middleware
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB
const CONNECTION_URI =
  process.env.CONNECTION_URI || "mongodb://localhost:27017/myflixDB";

mongoose
  .connect(CONNECTION_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err));

// 🚨 REGISTER PASSPORT FIRST
require("./passport");
app.use(passport.initialize());

// 🚨 THEN REGISTER AUTH *WITH APP*
require("./auth")(app);

// Home
app.get("/", (req, res) => {
  res.send("Welcome to myFlix API!");
});

// Protected GET user
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await Users.findOne({ Username: req.params.Username })
        .select("-Password -__v");

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
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

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

      res.status(201).json(cleanUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`🚀 Listening on port ${port}`));
