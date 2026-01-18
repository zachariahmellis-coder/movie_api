import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import passportJWT from "passport-jwt";
import { User } from "./models.js";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ Username: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username or password." });
        }
        // Password validation comes next exercise (hashing)
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload._id);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
