# myFlix API

A RESTful API built for CareerFoundry – Achievement 2.7 using Node.js, Express,
MongoDB, and Mongoose.

This API provides endpoints for managing movies, genres, directors, and user
accounts. JWT-based authentication is implemented to protect selected routes.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Passport (Local Strategy + JWT)
- JSON Web Tokens (JWT)
- Morgan

## Project Structure

movie_api/
├── index.js Express server entry point
├── models.js Mongoose schemas
├── auth.js Login and JWT generation
├── passport.js Passport Local and JWT strategies
├── db/ Seed scripts
├── public/ Static files (API documentation)
├── package.json
├── .gitignore
└── README.md

## Setup Instructions

1. Install dependencies

npm install

2. Start MongoDB

Ensure MongoDB is running locally on the default port (27017).

3. Start the server

npm run dev
or
npm start

Server runs at:

http://localhost:3000

## Environment Variables (Recommended)

Create a .env file in the project root:

MONGO_URI=mongodb://127.0.0.1:27017/myflixDB
PORT=3000

Note:
For this achievement, the JWT secret is currently hardcoded as "your_jwt_secret"
and must match in auth.js and passport.js.

## API Documentation

Full API documentation is available at:

http://localhost:3000/documentation

## Health Check

Verify server and database connectivity:

GET /health

Example response:

{
"ok": true,
"mongoState": 1
}

## Authentication

Login endpoint (returns JWT):

POST /login

Body (JSON):
{
"Username": "testuser",
"Password": "password123"
}

Response includes a JWT token used to access protected routes.

## Protected Routes

The following routes require a valid JWT passed as a Bearer Token:

- GET /movies
- GET /movies/:title
- GET /genres/:name
- GET /directors/:name
- GET /users
- PUT /users/:username
- POST /users/:username/movies/:movieId
- DELETE /users/:username/movies/:movieId
- DELETE /users/:username

Authorization checks ensure users can only modify their own accounts.

## Postman Testing

All endpoints were tested using Postman:

- Public routes tested without authentication
- Protected routes tested with and without JWT
- Authorization failures return 401 or 403 as expected

## Project Status

All required endpoints for Achievement 2.7 are implemented and tested locally
against a running MongoDB instance.

## CareerFoundry Submission Notes

MongoDB seed data and Postman screenshots are included with the submission, in
accordance with the Achievement 2.7 rubric.

## Notes

Password hashing (bcrypt) will be implemented in a later achievement.

Created by: Zachariah M. Ellis
Building a deliberate, location-free digital life.
