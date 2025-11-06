const express = require('express');
const morgan = require('morgan');
const app = express();

//Middleware: serves static file from 'public'
app.use(morgan('common'));
app.use(express.static('public'));

//Max's Top 10 Flix!!!!
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

//GET routes
app.get('/', (req ,res) => {
    res.send('Welcome to my cinematic inspiration!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oh no! Something broke! 🙉');
});

//listens for request
app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
});

