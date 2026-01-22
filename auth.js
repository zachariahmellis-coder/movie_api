// auth.js
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Ensure passport strategies are registered
require("./passport");

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

// Generate JWT
const generateJWTToken = (user) =>
  jwt.sign(
    {
      _id: user._id,
      Username: user.Username,
      Email: user.Email,
    },
    jwtSecret,
    {
      subject: user.Username,
      expiresIn: "7d",
      algorithm: "HS256",
    }
  );

module.exports = (app) => {
  app.post("/login", (req, res) => {
    passport.authenticate(
      "local",
      { session: false },
      (error, user, info) => {
        if (error) {
          console.error("Login error:", error);
          return res.status(500).json({ message: "Server error" });
        }

        if (!user) {
          return res
            .status(400)
            .json({ message: info?.message || "Incorrect username or password" });
        }

        // Establish login context (no sessions)
        req.login(user, { session: false }, (err) => {
          if (err) {
            console.error("req.login error:", err);
            return res.status(500).json({ message: "Login failed" });
          }

          const token = generateJWTToken(user);

          // Never return hashed passwords
          const safeUser = {
            _id: user._id,
            Username: user.Username,
            Email: user.Email,
            Birthday: user.Birthday,
            FavoriteMovies: user.FavoriteMovies,
          };

          return res.json({ user: safeUser, token });
        });
      }
    )(req, res);
  });
};
