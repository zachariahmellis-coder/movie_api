--
-- PostgreSQL database dump
--

\restrict YjacLceFYksMG8JOCNCybcspb3uYnaEuT5MG1QHQtoCJoCE3sS896nYsFZifPzL

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: app; Type: SCHEMA; Schema: -; Owner: movie_api_owner
--

CREATE SCHEMA app;


ALTER SCHEMA app OWNER TO movie_api_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: directors; Type: TABLE; Schema: app; Owner: zachariahmellis
--

CREATE TABLE app.directors (
    director_id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE app.directors OWNER TO zachariahmellis;

--
-- Name: genres; Type: TABLE; Schema: app; Owner: zachariahmellis
--

CREATE TABLE app.genres (
    genre_id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE app.genres OWNER TO zachariahmellis;

--
-- Name: movies; Type: TABLE; Schema: app; Owner: zachariahmellis
--

CREATE TABLE app.movies (
    movie_id integer NOT NULL,
    title text NOT NULL,
    director_id integer,
    genre_id integer
);


ALTER TABLE app.movies OWNER TO zachariahmellis;

--
-- Name: users; Type: TABLE; Schema: app; Owner: zachariahmellis
--

CREATE TABLE app.users (
    user_id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL
);


ALTER TABLE app.users OWNER TO zachariahmellis;

--
-- Name: users_movies; Type: TABLE; Schema: app; Owner: zachariahmellis
--

CREATE TABLE app.users_movies (
    user_id integer NOT NULL,
    movie_id integer NOT NULL
);


ALTER TABLE app.users_movies OWNER TO zachariahmellis;

--
-- Data for Name: directors; Type: TABLE DATA; Schema: app; Owner: zachariahmellis
--

COPY app.directors (director_id, name) FROM stdin;
1	Denis Villeneuve
2	Christopher Nolan
3	David Fincher
4	George Miller
5	Chad Stahelski
6	Lana Wachowski
\.


--
-- Data for Name: genres; Type: TABLE DATA; Schema: app; Owner: zachariahmellis
--

COPY app.genres (genre_id, name) FROM stdin;
1	Sci-Fi
2	Action
3	Thriller
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: app; Owner: zachariahmellis
--

COPY app.movies (movie_id, title, director_id, genre_id) FROM stdin;
1	Blade Runner 2049	1	1
2	Arrival	1	1
3	Inception	2	1
4	The Dark Knight	2	2
5	Fight Club	3	3
6	Se7en	3	3
7	Mad Max: Fury Road	4	2
8	John Wick	5	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: app; Owner: zachariahmellis
--

COPY app.users (user_id, username, email) FROM stdin;
2	HectorSvenson	hadmatter@example.com
3	XavierJorgenson	ilikecake@example.com
1	BobJones	bobjones_new@example.com
\.


--
-- Data for Name: users_movies; Type: TABLE DATA; Schema: app; Owner: zachariahmellis
--

COPY app.users_movies (user_id, movie_id) FROM stdin;
1	1
2	3
3	4
\.


--
-- Name: directors directors_pkey; Type: CONSTRAINT; Schema: app; Owner: zachariahmellis
--

ALTER TABLE ONLY app.directors
    ADD CONSTRAINT directors_pkey PRIMARY KEY (director_id);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: app; Owner: zachariahmellis
--

ALTER TABLE ONLY app.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (genre_id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: app; Owner: zachariahmellis
--

ALTER TABLE ONLY app.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (movie_id);


--
-- Name: users_movies users_movies_pkey; Type: CONSTRAINT; Schema: app; Owner: zachariahmellis
--

ALTER TABLE ONLY app.users_movies
    ADD CONSTRAINT users_movies_pkey PRIMARY KEY (user_id, movie_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: app; Owner: zachariahmellis
--

ALTER TABLE ONLY app.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: movies movies_director_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: zachariahmellis
--

ALTER TABLE ONLY app.movies
    ADD CONSTRAINT movies_director_id_fkey FOREIGN KEY (director_id) REFERENCES app.directors(director_id);


--
-- Name: movies movies_genre_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: zachariahmellis
--

ALTER TABLE ONLY app.movies
    ADD CONSTRAINT movies_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES app.genres(genre_id);


--
-- Name: users_movies users_movies_movie_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: zachariahmellis
--

ALTER TABLE ONLY app.users_movies
    ADD CONSTRAINT users_movies_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES app.movies(movie_id);


--
-- Name: users_movies users_movies_user_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: zachariahmellis
--

ALTER TABLE ONLY app.users_movies
    ADD CONSTRAINT users_movies_user_id_fkey FOREIGN KEY (user_id) REFERENCES app.users(user_id);


--
-- Name: SCHEMA app; Type: ACL; Schema: -; Owner: movie_api_owner
--

GRANT USAGE ON SCHEMA app TO movie_api_app;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: TABLE directors; Type: ACL; Schema: app; Owner: zachariahmellis
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app.directors TO movie_api_app;


--
-- Name: TABLE genres; Type: ACL; Schema: app; Owner: zachariahmellis
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app.genres TO movie_api_app;


--
-- Name: TABLE movies; Type: ACL; Schema: app; Owner: zachariahmellis
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app.movies TO movie_api_app;


--
-- Name: TABLE users; Type: ACL; Schema: app; Owner: zachariahmellis
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app.users TO movie_api_app;


--
-- Name: TABLE users_movies; Type: ACL; Schema: app; Owner: zachariahmellis
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app.users_movies TO movie_api_app;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: app; Owner: movie_api_owner
--

ALTER DEFAULT PRIVILEGES FOR ROLE movie_api_owner IN SCHEMA app GRANT ALL ON SEQUENCES TO movie_api_app;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: app; Owner: zachariahmellis
--

ALTER DEFAULT PRIVILEGES FOR ROLE zachariahmellis IN SCHEMA app GRANT ALL ON SEQUENCES TO movie_api_app;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: app; Owner: movie_api_owner
--

ALTER DEFAULT PRIVILEGES FOR ROLE movie_api_owner IN SCHEMA app GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES TO movie_api_app;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: app; Owner: zachariahmellis
--

ALTER DEFAULT PRIVILEGES FOR ROLE zachariahmellis IN SCHEMA app GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES TO movie_api_app;


--
-- PostgreSQL database dump complete
--

\unrestrict YjacLceFYksMG8JOCNCybcspb3uYnaEuT5MG1QHQtoCJoCE3sS896nYsFZifPzL

