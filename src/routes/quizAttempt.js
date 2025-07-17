const express = require('express');
const router = express.Router();
const quizAttemptController = require('../controllers/quizAttemptController');
const auth = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { quizAttemptSchema } = require('../validation/quizAttempt');

// Attempt a quiz
router.post('/', auth, validate(quizAttemptSchema), quizAttemptController.attemptQuiz);
// List all attempts for a quiz by the user
router.get('/quiz/:quizId', auth, quizAttemptController.getQuizAttempts);

module.exports = router; 