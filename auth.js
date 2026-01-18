// auth.js
const jwt = require("jsonwebtoken");
const passport = require("passport");

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

const generateJWTToken = (user) =>
  jwt.sign(
    { _id: user._id, Username: user.Username, Email: user.Email },
    jwtSecret,
    { subject: user.Username, expiresIn: "7d", algorithm: "HS256" }
  );

module.exports = (app) => {
  app.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error) return res.status(500).json({ message: error.message });
      if (!user) return res.status(400).json({ message: info?.message || "Login failed" });

      req.login(user, { session: false }, (err) => {
        if (err) return res.status(500).json({ message: err.message });

        const token = generateJWTToken(user);
        // optional: strip password
        const userObj = user.toObject ? user.toObject() : user;
        delete userObj.Password;

        return res.json({ user: userObj, token });
      });
    })(req, res);
  });
};
