🎬 Movie API

A Node.js REST API built for CareerFoundry – Achievement 2 using Express and PostgreSQL.

This project demonstrates:

Express server setup with middleware
PostgreSQL database integration using a connection pool
Environment-based configuration
Secure database access with a least-privilege user
Health check endpoint for verifying database connectivity
Graceful server shutdown

This project fulfills the database querying and SQL requirements for CareerFoundry Achievement 2.

🗂 Project Structure
movie_api/
├── db.js # PostgreSQL connection pool
├── index.js # Express server entry point
├── schema.sql # Database schema
├── seed.sql # Sample seed data
├── public/ # Static files (if applicable)
├── .env.example # Environment variable template
├── .gitignore
├── package.json
└── README.md

⚙️ Requirements

Node.js v18+

PostgreSQL (local installation)

npm

🚀 Setup Instructions
1️⃣ Install dependencies
npm install

2️⃣ Environment variables

Create a .env file using the provided example:

cp .env.example .env

Update .env with your local database credentials:

PORT=3000
DATABASE_URL=postgres://movie_api_app:YOUR_PASSWORD@localhost:5432/movie_api

⚠️ .env is intentionally ignored by Git and should never be committed.

3️⃣ Database setup

Run the schema and seed files as your dev/admin user (not the app user):

psql -U zachariahmellis -d movie_api -h localhost -p 5432 -f schema.sql
psql -U zachariahmellis -d movie_api -h localhost -p 5432 -f seed.sql

▶️ Running the Server

Start the API:

npm start

You should see:

Server running on http://localhost:3000

✅ Health Check Endpoint

Verify the server and database connection:

curl http://localhost:3000/health

Expected response:

{
"ok": true,
"db": 1
}

This confirms:

Express is running
PostgreSQL is connected
Environment variables are configured correctly

🔐 Database Security Notes
The application connects using a least-privilege database user
Schema changes are run manually via SQL scripts
The app user cannot create or alter tables
This mirrors real-world production best practices.

🧠 Key Learning Outcomes
Express routing and middleware
PostgreSQL connection pooling
Environment variable management
Secure database role separation
Graceful server shutdown handling
Clean project and Git hygiene

🔮 Future Improvements
Add full CRUD endpoints for movies
Add request validation
Implement centralized error handling
Add automated tests
Containerize with Docker

📂 CareerFoundry Submission Notes

SQL query screenshots and a full PostgreSQL database export are included separately with the project submission, as required by the Achievement rubric.

Note: This project includes both SQL (Exercise 2.6) and MongoDB (Exercise 2.7) artifacts as part of the CareerFoundry curriculum.

Created by: Zachariah M. Ellis
Evolving with purpose — building a limitless digital life.
