const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const auth = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { quizSchema } = require('../validation/quiz');

// Public: List quizzes for a course
router.get('/course/:courseId', quizController.getQuizzesByCourse);

// Admin: Create, update, delete quizzes (add admin check later)
router.post('/', auth, isAdmin, validate(quizSchema), quizController.createQuiz);
router.put('/:id', auth, isAdmin, validate(quizSchema), quizController.updateQuiz);
router.delete('/:id', auth, isAdmin, quizController.deleteQuiz);
router.get('/:id/analytics', auth, isAdmin, quizController.getQuizAnalytics);

module.exports = router; 