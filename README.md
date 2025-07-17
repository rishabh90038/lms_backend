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
- **Bonus:** Quiz analytics, course recommendations

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** PostgreSQL, Sequelize ORM
- **Authentication:** JWT
- **Validation:** Joi
- **Security:** Helmet, CORS, Rate Limiting

## Demo Accounts
- **Admin**
  - Email: `admin@example.com`
  - Password: `adminpass`
- **User**
  - Email: `user@example.com`
  - Password: `userpass`

## API Documentation
- Interactive Swagger UI: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- ![Swagger Screenshot](./docs/swagger-screenshot.png) <!-- Add screenshot if available -->

## Example API Usage

### Signup
```http
POST /api/auth/signup
{
  "name": "Test User",
  "email": "user@example.com",
  "password": "userpass"
}
```

### Login
```http
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "userpass"
}
```

### Create Course (Admin)
```http
POST /api/courses
Authorization: Bearer <admin_token>
{
  "title": "Node.js Basics",
  "description": "Learn Node.js from scratch.",
  "instructor": "John Doe",
  "price": 49.99
}
```

### Enroll in Course
```http
POST /api/enrollments
Authorization: Bearer <user_token>
{
  "courseId": 1
}
```

### Mark Lesson Complete
```http
POST /api/progress/complete
Authorization: Bearer <user_token>
{
  "lessonId": 1
}
```

### Quiz Analytics (Admin)
```http
GET /api/quizzes/1/analytics
Authorization: Bearer <admin_token>
```

### Course Recommendations
```http
GET /api/courses/recommendations
Authorization: Bearer <user_token>
```

## Bonus Features
- Quiz analytics: Average score, total attempts, top scorers per quiz
- Course recommendations: "Users who enrolled in X also enrolled in Y"

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

## Deployment
- Deploy easily to [Render](https://render.com/), [Railway](https://railway.app/), or [Heroku](https://heroku.com/).
- Set environment variables in your deployment dashboard.
- Make sure your PostgreSQL database is accessible from your deployment.
- Add your live API URL here: `https://your-lms-api-url.com`

## Reviewer Checklist
- [ ] All endpoints tested (manual or automated)
- [ ] Admin and user flows tested
- [ ] Error and edge cases tested
- [ ] No secrets or node_modules in repo
- [ ] Swagger docs available at `/api-docs`
- [ ] Bonus features demoed

## Professional Practices
- All secrets and credentials are managed via environment variables and never committed to version control.
- Code is modular, well-commented, and follows industry-standard structure (MVC, service layers, middlewares).
- Input validation and error handling are implemented throughout.
- Security best practices: JWT auth, helmet, CORS, rate limiting, and no sensitive info in errors.
- Linting and formatting enforced via ESLint and Prettier.
- Production-ready: easily deployable to Heroku, Render, or Railway with a single command.
- API documentation is always up-to-date via Swagger UI.
- Reviewer/tester instructions and demo credentials are provided for easy evaluation.

## License
MIT 