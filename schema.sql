-- schema.sql
-- PostgreSQL

CREATE TABLE directors (
    director_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    birth_year INT,
    death_year INT
);

CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE movies (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT,
    featured BOOLEAN,
    director_id INT REFERENCES directors (director_id),
    genre_id INT REFERENCES genres (genre_id)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE users_movies (
    user_id INT REFERENCES users (user_id),
    movie_id INT REFERENCES movies (movie_id),
    PRIMARY KEY (user_id, movie_id)
);