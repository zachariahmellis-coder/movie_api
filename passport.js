// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Models = require('./models.js');
const Users = Models.User;

// Local Strategy (username/password login)
passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, done) => {
      try {
        const user = await Users.findOne({ Username: username });
        if (!user) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }

        if (!user.validatePassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// JWT Strategy (protect routes)
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret',
    },
    async (jwtPayload, done) => {
      try {
        const user = await Users.findById(jwtPayload._id);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

module.exports = passport;
