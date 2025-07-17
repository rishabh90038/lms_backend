# Learning Management System (LMS) Backend

A professional, scalable backend API for a Learning Management System (LMS) built with Node.js, Express, and PostgreSQL. This system allows users to sign up, view courses, enroll, and track their learning progress. Admins can manage courses, lessons, and quizzes.

## Features
- User authentication (JWT-based)
- Admin and user roles
- Course management (CRUD for admin)
- Lesson and quiz management
- User enrollment and progress tracking
- Quiz attempts and scoring
- Pagination, input validation, and rate limiting
- Secure, production-ready setup

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** PostgreSQL, Sequelize ORM
- **Authentication:** JWT
- **Validation:** Joi
- **Security:** Helmet, CORS, Rate Limiting

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL

### Setup
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd lms-backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and update values:
     ```bash
     cp .env.example .env
     ```
   - Set your `DATABASE_URL`, `JWT_SECRET`, and `PORT`.
4. **Run database migrations:**
   ```bash
   npx sequelize-cli db:migrate
   ```
5. **Start the server:**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000` by default.

## Scripts
- `npm run dev` — Start server with nodemon (development)
- `npm start` — Start server (production)
- `npm run lint` — Lint and auto-fix code

## Project Structure
```
lms-backend/
  src/
    config/
    controllers/
    middlewares/
    models/
    routes/
    services/
    utils/
    app.js
    server.js
  .env
  .gitignore
  package.json
  README.md
```

## License
MIT 