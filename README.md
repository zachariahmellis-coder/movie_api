# myFlix API

A RESTful API built for CareerFoundry – Exercise 2.10 using Node.js, Express,
MongoDB, and Mongoose.

This API provides endpoints for managing movies, genres, directors, and user
accounts. JWT-based authentication and authorization are implemented to protect
selected routes.

---

## Tech Stack

- Node.js
- Express
- MongoDB & MongoDB Atlas
- Mongoose
- Passport (Local Strategy + JWT)
- JSON Web Tokens (JWT)
- bcrypt
- express-validator
- Morgan
- CORS
- Heroku

---

## Project Structure

movie_api/
├── index.js Express server entry point
├── models.js Mongoose schemas and password hashing
├── auth.js Login and JWT generation
├── passport.js Passport Local and JWT strategies
├── public/ Static API documentation
├── package.json
├── .gitignore
└── README.md

---

## Setup Instructions (Local)

1. Install dependencies

npm install

2. Start MongoDB

Ensure MongoDB is running locally on the default port (27017).

3. Start the server

npm start

Server runs at:

http://localhost:8080

---

## Environment Variables

The application uses environment variables to protect sensitive credentials.

Example (local development):

MONGO_URI=mongodb://127.0.0.1:27017/myflixDB
PORT=8080

In production, the MongoDB Atlas connection URI is stored securely using
Heroku config variables and is not committed to the repository.

---

## Authentication & Security

- Passwords are hashed using bcrypt for both registration and login
- JWT-based authentication is used
- Protected routes require a valid Bearer token
- Unauthorized requests are rejected

---

## Authentication Endpoint

### Login (returns JWT)

POST /login

Body (JSON):
{
"Username": "testuser",
"Password": "password123"
}

Response includes a JWT token used to access protected routes.

---

## Protected Routes

The following routes require a valid JWT passed as a Bearer Token:

- GET /users/:Username
- PUT /users/:Username
- POST /users/:Username/movies/:MovieID
- DELETE /users/:Username/movies/:MovieID
- DELETE /users/:Username

Authorization checks ensure that users can only access or modify their own
accounts. Unauthorized users cannot make changes.

---

## Data Validation

- express-validator is used on all data-receiving endpoints
- Invalid input returns appropriate 422 errors
- Validation is enforced for usernames, passwords, and email formats

---

## CORS

CORS is enabled to allow requests from all domains, supporting front-end
integration and external testing tools.

---

## Deployment

- API deployed on Heroku
- Database hosted on MongoDB Atlas
- Environment variables used to integrate production services securely

Live deployment successfully connects Heroku to MongoDB Atlas.

---

## Testing

All endpoints were tested using Postman and curl:

- Public routes tested without authentication
- Protected routes tested with and without JWT
- Authorization failures return 401 or 403 as expected

Screenshots are included with the submission to demonstrate functionality.

---

## Project Status

All required functionality for Exercise 2.10 has been implemented, tested,
and deployed in accordance with the CareerFoundry rubric.

---

Created by: Zachariah M. Ellis  
Building a deliberate, location-free digital life.
