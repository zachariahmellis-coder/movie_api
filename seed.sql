-- seed.sql
USE movie_api;

-- Directors
INSERT INTO Directors (director_id, name) VALUES
(1, 'Denis Villeneuve'),
(2, 'Christopher Nolan'),
(3, 'David Fincher'),
(4, 'George Miller'),
(5, 'Chad Stahelski'),
(6, 'Lana Wachowski');

-- Genres
INSERT INTO Genres (genre_id, name) VALUES
(1, 'Sci-Fi'),
(2, 'Action'),
(3, 'Thriller');

-- Movies
INSERT INTO Movies (movie_id, title, director_id, genre_id) VALUES
(1, 'Blade Runner 2049', 1, 1),
(2, 'Arrival', 1, 1),
(3, 'Inception', 2, 1),
(4, 'The Dark Knight', 2, 2),
(5, 'Fight Club', 3, 3),
(6, 'Se7en', 3, 3),
(7, 'Mad Max: Fury Road', 4, 2),
(8, 'John Wick', 5, 2),
(9, 'The Matrix', 6, 1);

-- Users (minimum schema: user_id, username)
INSERT INTO Users (user_id, username, email) VALUES
(1, 'BobJones', 'bobjones@example.com'),
(2, 'HectorSvenson', 'hadmatter@example.com'),
(3, 'XavierJorgenson', 'ilikecake@example.com');

-- Users_Movies (join table: user_id, movie_id)
INSERT INTO Users_Movies (user_id, movie_id) VALUES
(1, 1),
(2, 3),
(3, 4);
