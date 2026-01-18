// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Models = require('./models.js');
const Users = Models.User;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      try {
        const user = await Users.findOne({ Username: username });
        if (!user) {
          return callback(null, false, { message: 'Incorrect username or password.' });
        }

        // ✅ THIS is the hashing comparison
        if (!user.validatePassword(password)) {
          return callback(null, false, { message: 'Incorrect password.' });
        }

        return callback(null, user);
      } catch (err) {
        return callback(err);
      }
    }
  )
);

// JWT Strategy (typical CareerFoundry setup)
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret', // ideally env var
    },
    async (jwtPayload, callback) => {
      try {
        const user = await Users.findById(jwtPayload._id);
        return callback(null, user);
      } catch (err) {
        return callback(err, false);
      }
    }
  )
);

module.exports = passport;
