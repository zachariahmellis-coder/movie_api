# myFlix API

A RESTful API built for CareerFoundry – Achievement 2.7 using Node.js, Express, MongoDB, and Mongoose.

This API provides endpoints for managing movies, genres, directors, and user accounts, including user favorites.

---

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Morgan

---

## Project Structure

```

movie_api/
├── index.js # Express server entry point
├── models.js # Mongoose schemas
├── db/ # Seed scripts
├── public/ # Static files (documentation)
├── package.json
├── .gitignore
└── README.md

```

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Start MongoDB

Ensure MongoDB is running locally on the default port (27017).

### 3. Start the server

```bash
npm start
```

Server runs at:

```
http://localhost:3000
```

---

## API Documentation

Full API documentation is available at:

```
http://localhost:3000/documentation
```

---

## Health Check

Verify server and database connectivity:

```
GET /health
```

Example response:

```json
{
  "ok": true,
  "mongoState": 1
}
```

---

## Project Status

All required endpoints are implemented and tested locally using Postman against a running MongoDB instance.

---

## CareerFoundry Submission Notes

MongoDB seed data and Postman screenshots are included with the submission, as required by the Achievement 2.7 rubric.

---

Created by: Zachariah M. Ellis
Building a deliberate, location-free digital life.
