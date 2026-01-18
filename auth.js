import jwt from "jsonwebtoken";
import passport from "passport";
import "./passport.js";

const jwtSecret = "your_jwt_secret"; // must match passport.js secretOrKey

const generateJWTToken = (user) =>
  jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256",
  });

export default function auth(app) {
  app.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user) => {
      if (error || !user) {
        return res.status(401).json({
          message: "Invalid username or password",
        });
      }

      req.login(user, { session: false }, (error) => {
        if (error) return res.status(500).send(error);
        const token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}
