# myFlix API

A RESTful backend API for the myFlix movie application, built as part of the CareerFoundry Software Engineering Program (Achievement 2).

This API handles user authentication, authorization, and secure access to movie and user data using JWT-based authentication.

---

## Project Overview

The myFlix API provides endpoints for:

- User registration and login
- Secure authentication using JSON Web Tokens (JWT)
- Protected access to movie data
- User profile data and favorites management

Sensitive routes are protected and require a valid JWT to access.

---

## Tech Stack

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

## Quick Start (Local)

### 1. Install dependencies

```bash
npm install
```

### 2. Start MongoDB

Ensure MongoDB is running locally on port `27017`.

### 3. Start the server

```bash
npm start
```

The API will run at:

```
http://localhost:8080
```

---

## Environment Variables

Sensitive configuration values are managed using environment variables.

Example `.env` file:

```env
CONNECTION_URI=mongodb://127.0.0.1:27017/myflixDB
PORT=8080
```

---

## Authentication

Authentication is handled using JWTs.

### Login Flow

1. User logs in via `POST /login`
2. Server returns a signed JWT
3. Client stores the token
4. Token is sent with future requests

### Authorization Header Example

```
Authorization: Bearer <JWT_TOKEN>
```

Protected routes require a valid token in the request header.

---

## API Endpoints Overview

### User Routes

- **POST /users**
  Registers a new user with validation for:
  - Username (minimum length)
  - Password (minimum length)
  - Email (valid format)

- **POST /login**
  Authenticates a user and returns a JWT.

- **GET /users/:Username**
  Returns user profile data.
  Requires authentication.
  Users may only access their own account data.

---

### Movie Routes (Protected)

- **GET /movies**
  Returns a list of all movies.
  Requires authentication.

- **POST /users/:Username/movies/:MovieID**
  Adds a movie to the user’s list of favorites.

- **DELETE /users/:Username/movies/:MovieID**
  Removes a movie from the user’s list of favorites.

---

## Testing

All API endpoints were tested using Postman and curl, including:

- Input validation errors
- Password hashing verification
- JWT issuance on login
- Authorized vs unauthorized access to protected routes

---

## Deployment

The backend API is deployed to Heroku and connected to a MongoDB Atlas database.

### Live API URL

```
https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com
```

---

## Related Projects

This API is consumed by a React-based client application developed in later CareerFoundry exercises.

The frontend implements:

- Login and signup forms
- JWT-based authentication
- Protected movie fetching
- Logout and session handling

---

## Project Status

- Backend API completed and deployed (Achievement 2)
- Authentication and protected routes implemented
- API stable and ready for frontend integration

---

## Author

Zachariah M. Ellis
CareerFoundry Software Engineering Student

```

---

## 🔒 Why this version is mentor-proof
- Clear **backend-only scope**
- No frontend confusion
- Explicit auth flow
- Minimal but complete endpoint coverage
- No over-engineering
- Reads like a real production API README

---

### Next move after this commit?
Once this is pushed:
- Backend is **frozen**
- We switch to **CF Exercise 3.6**
- React gets easier because your API is rock-solid

Say the word when the commit is pushed and we’ll pivot. 😈🔥
```
