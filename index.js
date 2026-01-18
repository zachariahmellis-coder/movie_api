// index.js
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;

const app = express();

// Middleware
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Step 1: CORS (allow ALL domains)
app.use(cors());

// ✅ MongoDB connection via env var (Heroku Config Var: CONNECTION_URI)
// Local fallback optional (nice for dev)
const connectionUri = process.env.CONNECTION_URI || 'mongodb://localhost:27017/myFlixDB';

mongoose.connect(
  process.env.CONNECTION_URI || 'mongodb://localhost:27017/myflixDB'
);

// Auth
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

app.get('/', (req, res) => {
  res.send('Welcome to myFlix API!');
});

// ✅ Step 2 + 3: POST /users with hashing + validation
app.post(
  '/users',
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const hashedPassword = Users.hashPassword(req.body.Password);

      const existingUser = await Users.findOne({ Username: req.body.Username });
      if (existingUser) return res.status(400).send(req.body.Username + ' already exists');

      const newUser = await Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      });

      return res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Error: ' + err);
    }
  }
);

// ✅ Step 3: PUT /users/:Username with validation (+ hash if password is being changed)
app.put(
  '/users/:Username',
  [
    check('Username', 'Username must be at least 5 characters long').optional().isLength({ min: 5 }),
    check('Username', 'Username contains non-alphanumeric characters - not allowed.').optional().isAlphanumeric(),
    check('Password', 'Password is required').optional().not().isEmpty(),
    check('Email', 'Email does not appear to be valid').optional().isEmail(),
  ],
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const update = { ...req.body };

      // If they sent a Password, hash it before saving
      if (update.Password) {
        update.Password = Users.hashPassword(update.Password);
      }

      const updatedUser = await Users.findOneAndUpdate(
        { Username: req.params.Username },
        { $set: update },
        { new: true }
      );

      return res.json(updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Error: ' + err);
    }
  }
);

// (Your other routes go here)

// ✅ Heroku-safe port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

