myFlix API

A RESTful API built for CareerFoundry Achievement 2.7 using Node.js, Express, MongoDB, and Mongoose.

This API provides endpoints for user registration, authentication, and secure access to user data. JWT-based authentication and authorization are implemented to protect sensitive routes.

Tech Stack

Node.js
Express
MongoDB
Mongoose
Passport (Local Strategy and JWT)
JSON Web Tokens (JWT)
bcrypt
Morgan
CORS

Project Structure

movie_api/
index.js – Express server entry point
models.js – Mongoose schemas and password hashing
auth.js – Login route and JWT generation
passport.js – Passport Local and JWT strategies
public/ – Static API documentation
package.json
.env (not committed)
README.md

Setup Instructions (Local)

Install dependencies
npm install

Start MongoDB
Ensure MongoDB is running locally on port 27017

Start the server
npm start

The server runs on http://localhost:8080

Environment Variables

Environment variables are used to protect sensitive configuration data.

Example .env file:

CONNECTION_URI=mongodb://127.0.0.1:27017/myflixDB
PORT=8080

Authentication and Security

Password Hashing
All user passwords are hashed using bcrypt before being stored. Plain-text passwords are never saved in the database.

Authentication
Users authenticate via the /login endpoint. A successful login returns a JSON Web Token (JWT).

Authorization
Protected routes require a valid JWT passed as a Bearer token. Users can only access or modify their own account data.

Key Endpoints

POST /users
Registers a new user with validation for username, password, and email.

POST /login
Authenticates a user and returns a JWT.

GET /users/:Username
Protected route that returns user data when a valid JWT is provided.

CORS

CORS is enabled globally, allowing requests from all domains.

Testing

All endpoints were tested using Postman and curl. Testing includes validation errors, successful user creation, password hashing verification, JWT issuance on login, and authorized access to protected routes. Screenshots are included with the submission.

Deployment

The API is deployed to Heroku and connected to a MongoDB Atlas database using environment variables.

Live API URL:
https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com

Project Status

All requirements for CareerFoundry Achievement 2.7 have been implemented, tested, and deployed.

Author

Zachariah M. Ellis
CareerFoundry Software Engineering Student
