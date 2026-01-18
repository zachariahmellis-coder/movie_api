// auth.js
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

const generateJWTToken = (user) =>
  jwt.sign(
    {
      _id: user._id,
      Username: user.Username,
      Email: user.Email
    },
    jwtSecret,
    {
      subject: user.Username,
      expiresIn: '7d',
      algorithm: 'HS256'
    }
  );

module.exports = (app) => {
  app.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error during login' });
      }

      if (!user) {
        return res.status(400).json({
          message: info?.message || 'Incorrect username or password'
        });
      }

      // This is optional but nice: establishes req.user for this request
      req.login(user, { session: false }, (loginErr) => {
        if (loginErr) {
          console.error('req.login error:', loginErr);
          return res.status(500).json({ message: 'Login failed' });
        }

        const token = generateJWTToken(user);

        // Don’t send hashed password back
        const userObj = user.toObject();
        delete userObj.Password;

        return res.json({ user: userObj, token });
      });
    })(req, res, next); 
  });
};
