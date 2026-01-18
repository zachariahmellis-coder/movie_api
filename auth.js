// auth.js (CommonJS version)
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport');

const jwtSecret = 'your_jwt_secret'; // must match passport.js

const generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256'
  });
};

module.exports = (app) => {
  app.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user) => {
      if (error || !user) {
        return res.status(401).json({
          message: 'Invalid username or password'
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        const token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
