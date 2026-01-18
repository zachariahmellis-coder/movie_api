-- seed.sql
-- PostgreSQL

-- Directors (6)
INSERT INTO
    directors (
        name,
        bio,
        birth_year,
        death_year
    )
VALUES (
        'Denis Villeneuve',
        'Canadian filmmaker known for atmospheric science fiction.',
        1967,
        NULL
    ),
    (
        'Christopher Nolan',
        'Known for complex narratives and practical effects.',
        1970,
        NULL
    ),
    (
        'David Fincher',
        'Known for dark psychological thrillers.',
        1962,
        NULL
    ),
    (
        'George Miller',
        'Australian director known for the Mad Max franchise.',
        1945,
        NULL
    ),
    (
        'Chad Stahelski',
        'Action director and former stuntman, known for John Wick.',
        1968,
        NULL
    ),
    (
        'Lana Wachowski',
        'Filmmaker best known for The Matrix series.',
        1965,
        NULL
    );

-- Genres (3)
INSERT INTO
    genres (name, description)
VALUES (
        'Sci-Fi',
        'Science fiction films exploring futuristic concepts and technology.'
    ),
    (
        'Action',
        'Fast-paced films featuring physical stunts and combat.'
    ),
    (
        'Thriller',
        'Suspense-driven films designed to provoke tension.'
    );

-- Movies (11)
-- Assumes director_id and genre_id are created in order (directors 1..6, genres 1..3)
INSERT INTO
    movies (
        title,
        description,
        image_url,
        featured,
        director_id,
        genre_id
    )
VALUES (
        'Blade Runner 2049',
        'A replicant uncovers a long-buried secret.',
        NULL,
        TRUE,
        1,
        1
    ),
    (
        'Arrival',
        'A linguist communicates with extraterrestrial visitors.',
        NULL,
        FALSE,
        1,
        1
    ),
    (
        'Dune',
        'A noble family becomes embroiled in a galactic power struggle.',
        NULL,
        TRUE,
        1,
        1
    ),
    (
        'Inception',
        'A thief steals secrets through dream-sharing technology.',
        NULL,
        TRUE,
        2,
        1
    ),
    (
        'Tenet',
        'An operative manipulates time to prevent catastrophe.',
        NULL,
        FALSE,
        2,
        1
    ),
    (
        'The Dark Knight',
        'Batman faces the Joker in Gotham City.',
        NULL,
        TRUE,
        2,
        2
    ),
    (
        'Fight Club',
        'An insomniac forms an underground fight club.',
        NULL,
        FALSE,
        3,
        3
    ),
    (
        'Se7en',
        'Detectives hunt a serial killer inspired by the seven deadly sins.',
        NULL,
        FALSE,
        3,
        3
    ),
    (
        'Mad Max: Fury Road',
        'A post-apocalyptic chase across the wasteland.',
        NULL,
        TRUE,
        4,
        2
    ),
    (
        'John Wick',
        'An ex-hitman returns to the criminal underworld.',
        NULL,
        TRUE,
        5,
        2
    ),
    (
        'The Matrix',
        'A hacker discovers reality is a simulation.',
        NULL,
        TRUE,
        6,
        1
    );

-- Users (3) includes email
INSERT INTO
    users (username, email)
VALUES (
        'BobJones',
        'bobjones@example.com'
    ),
    (
        'HectorSvenson',
        'hadmatter@example.com'
    ),
    (
        'XavierJorgenson',
        'ilikecake@example.com'
    );

-- Users_Movies (3 user-movie pairs)
INSERT INTO
    users_movies (user_id, movie_id)
VALUES (1, 1),
    (2, 4),
    (3, 9) ON CONFLICT DO NOTHING;