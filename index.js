const express = require('express');
const morgan = require('morgan');
const app = express();

//Middleware: serves static file from 'public'
app.use(morgan('common'));
app.use(express.json());
app.use(express.static('public'));

//Max's Top 10 Flir!!!!
let topMovies = [
  { title: 'Blade Runner 2049', director: 'Denis Villeneuve', year: 2017, genre: 'Neo-Noir / Sci-Fi' },
  { title: 'The Crow', director: 'Alex Proyas', year: 1994, genre: 'Dark Fantasy / Action' },
  { title: 'The Stand', director: 'Mick Garris', year: 1994, genre: 'Post-Apocalyptic / Drama' },
  { title: 'Christine', director: 'John Carpenter', year: 1983, genre: 'Horror / Supernatural' },
  { title: 'Les Misérables', director: 'Tom Hooper', year: 2012, genre: 'Musical / Historical Drama' },
  { title: 'Batman: The Dark Knight Returns', director: 'Jay Oliva', year: 2012, genre: 'Animation / Action / Psychological' },
  { title: 'Bullet Train', director: 'David Leitch', year: 2022, genre: 'Action / Comedy / Thriller' },
  { title: 'The Man from Nowhere', director: 'Lee Jeong-beom', year: 2010, genre: 'Neo-Noir / Action' },
  { title: 'Desperado', director: 'Robert Rodriguez', year: 1995, genre: 'Action / Crime / Western' },
  { title: 'The Untouchables', director: 'Brian De Palma', year: 1987, genre: 'Crime / Drama / Historical' }
];

//Home
app.get('/', (req, res) => {
  res.send("Welcome to Max's Movie API - cinematic inspiration incoming! 🎬");
});

//Doc page
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});


// myFlix REST API endpoints
// 1. Return a list of movies to all movies to the user
app.get('/movies', (req, res) => {
  res.status(200).json(topMovies);
});

// 2. Return data about a single movie by title
app.get('/movies/:title', (req, res) => {
    res.send(`Successful GET request returning data for movie: ${req.params.title}`);
});

// 3. Return data about a genre by name/title
app.get('/genres/:name', (req, res) => {
  const genreName = req.params.name;
  res.send(`Successful GET request returning data for genre: ${genreName}`);
});

// 4. Return data about a director by name
app.get('/directors/:name', (req, res) => {
  const directorName = req.params.name;
  res.send(`Successful GET request returning data for director: ${directorName}`);
});

// 5. Allow new users to register
app.post('/users', (req, res) => {
  res.status(201).send('POST user – this will register a new user.');
});

// 6. Allow users to update their user info (username)
app.put('/users/:username', (req, res) => {
  const username = req.params.username;
  res.send(`PUT user – this will update info for user: ${username}`);
});

// 7. Allow users to add a movie to their list of favorites
app.post('/users/:username/movies/:movieId', (req, res) => {
  res.send(`POST favorite – movie ${req.params.movieId} will be added to ${req.params.username}'s favorites.`);
});

// 8. Allow users to remove a movie from their list of favorites
app.delete('/users/:username/movies/:movieId', (req, res) => {
  res.send(`DELETE favorite – movie ${req.params.movieId} will be removed from ${req.params.username}'s favorites.`);
});

// 9. Allow existing users to deregister
app.delete('/users/:username', (req, res) => {
  res.send(`DELETE user – user ${req.params.username} will be deregistered.`);
});

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Oh no! Something broke! 🙉');
});

//Listen
app.listen(8080, () => {
  console.log("Your app is listening on port 8080")
});
