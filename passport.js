// auth.js
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("./passport"); // makes sure strategies are registered

// MUST match passport.js
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

function generateJWTToken(user) {
  // Keep token payload minimal (no hashed password)
  return jwt.sign(
    { _id: user._id, Username: user.Username },
    jwtSecret,
    {
      subject: user.Username,
      expiresIn: "7d",
      algorithm: "HS256",
    }
  );
}

module.exports = (app) => {
  // POST /login
  app.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(401).json({
          message: (info && info.message) || "Invalid username or password",
        });
      }

      req.login(user, { session: false }, (error) => {
        if (error) return res.status(500).json({ message: "Login error", error });

        const token = generateJWTToken(user);
        const userObj = user.toObject();
        delete userObj.Password; // don't return hashed password

        return res.json({ user: userObj, token });
      });
    })(req, res);
  });
};
