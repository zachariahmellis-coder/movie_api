// auth.js
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport'); // register strategies

// MUST match passport.js secretOrKey
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

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
      expiresIn: '7d',
      algorithm: 'HS256',
    }
  );

module.exports = (app) => {
  app.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error during login' });
      }

      if (!user) {
        return res.status(400).json({
          message: (info && info.message) ? info.message : 'Incorrect username or password.',
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          console.error('req.login error:', err);
          return res.status(500).json({ message: 'Server error during login' });
        }

        const token = generateJWTToken(user);

        // Don’t return hashed password
        const userObj = user.toObject ? user.toObject() : user;
        delete userObj.Password;

        return res.json({ user: userObj, token });
      });
    })(req, res);
  });
};
