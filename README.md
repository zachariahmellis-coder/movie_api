# myFlix Application

A full-stack movie application built as part of the CareerFoundry Software Engineering program.

This project consists of:

- A RESTful backend API (Achievement 2)
- A React-based client application with authentication and forms (Exercise 3.5)

The project is designed to evolve incrementally as new frontend features are added.

---

## Current Focus: Exercise 3.5 – React Forms & Authentication

This stage of the project implements client-side authentication and form handling using React.

### Implemented Features

- Login form with client-side validation
- Signup form with validation aligned to backend rules
- JWT-based authentication flow
- Authentication token stored in localStorage for session persistence
- Protected movie fetching using Bearer tokens
- Logout functionality that clears application state and localStorage

Authenticated requests to the `/movies` endpoint include a valid JWT in the Authorization header.

---

## Tech Stack

### Frontend

- React
- JavaScript (ES6+)
- HTML
- CSS
- Parcel

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Passport (Local Strategy and JWT)
- JSON Web Tokens (JWT)
- bcrypt
- Morgan
- CORS

---

## Backend API Overview (Achievement 2)

The myFlix API provides endpoints for user registration, authentication, and secure access to movie and user data. Sensitive routes are protected using JWT-based authentication.

### Key Endpoints

- POST /users  
  Registers a new user with validation for username, password, and email.

- POST /login  
  Authenticates a user and returns a JSON Web Token (JWT).

- GET /movies  
  Protected route that returns all movies for authenticated users.

- GET /users/:Username  
  Protected route that returns user data when a valid JWT is provided.

Users may only access or modify their own account data.

---

## Project Structure

movie_api/

- index.js – Express server entry point
- models.js – Mongoose schemas and password hashing
- auth.js – Login route and JWT generation
- passport.js – Passport Local and JWT strategies
- public/ – Static API documentation

myFlix-client/

- src/
  - components/
    - login-view
    - signup-view
    - main-view
    - movie-card
    - movie-view

---

## Local Setup (Backend)

Install dependencies:
npm install

Start MongoDB:
Ensure MongoDB is running locally on port 27017.

Start the server:
npm start

The server runs at:
http://localhost:8080

---

## Environment Variables

Sensitive configuration is managed using environment variables.

Example .env file:

CONNECTION_URI=mongodb://127.0.0.1:27017/myflixDB  
PORT=8080

---

## Testing

API endpoints and authentication flows were tested using Postman and curl, including:

- Validation errors
- Password hashing verification
- JWT issuance on login
- Authorized and unauthorized access to protected routes

---

## Deployment

The backend API is deployed to Heroku and connected to a MongoDB Atlas database.

Live API URL:
https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com

---

## Project Status

- Backend API completed and deployed (Achievement 2)
- React authentication forms implemented (Exercise 3.5)
- Project continues to evolve with additional frontend features

---

## How to Run the Client (Local)

Navigate to the client directory:
cd myFlix-client

Install dependencies:
npm install

Start the development server:
npm start

The client application will run locally and communicate with the backend API.
Ensure the backend server is running before logging in.

## Author

Zachariah M. Ellis  
CareerFoundry Software Engineering Student
