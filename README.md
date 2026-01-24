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
