// auth.js
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("./passport"); // registers strategies

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

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
  // app MUST be Express — nothing else
  app.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
      }

      if (!user) {
        return res.status(400).json({
          message: info?.message || "Incorrect username or password",
        });
      }

      const token = generateJWTToken(user);
      return res.json({ user, token });
    })(req, res);
  });
};
