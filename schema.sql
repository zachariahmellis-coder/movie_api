-- schema.sql
DROP DATABASE IF EXISTS movie_api;
CREATE DATABASE movie_api;
USE movie_api;

CREATE TABLE Directors (
  director_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE Genres (
  genre_id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE Movies (
  movie_id INT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  director_id INT,
  genre_id INT,
  FOREIGN KEY (director_id) REFERENCES Directors(director_id),
  FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);

CREATE TABLE Users (
  user_id INT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE Users_Movies (
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  PRIMARY KEY (user_id, movie_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
);
-- schema.sql (PostgreSQL)

-- Drop in dependency order
DROP TABLE IF EXISTS users_movies;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS directors;
DROP TABLE IF EXISTS genres;

CREATE TABLE directors (
  director_id INT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE genres (
  genre_id INT PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE movies (
  movie_id INT PRIMARY KEY,
  title TEXT NOT NULL,
  director_id INT REFERENCES directors(director_id),
  genre_id INT REFERENCES genres(genre_id)
);

CREATE TABLE users (
  user_id INT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE users_movies (
  user_id INT NOT NULL REFERENCES users(user_id),
  movie_id INT NOT NULL REFERENCES movies(movie_id),
  PRIMARY KEY (user_id, movie_id)
);





