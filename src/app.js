const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const courseRoutes = require('./routes/course');
const lessonRoutes = require('./routes/lesson');
const quizRoutes = require('./routes/quiz');
const enrollmentRoutes = require('./routes/enrollment');
const progressRoutes = require('./routes/progress');
const quizAttemptRoutes = require('./routes/quizAttempt');
const questionRoutes = require('./routes/question');
const optionRoutes = require('./routes/option');
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/quiz-attempts', quizAttemptRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/options', optionRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
