const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const auth = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { questionSchema } = require('../validation/question');

// Public: List questions for a quiz
router.get('/quiz/:quizId', questionController.getQuestionsByQuiz);

// Admin: Create, update, delete questions
router.post('/', auth, isAdmin, validate(questionSchema), questionController.createQuestion);
router.put('/:id', auth, isAdmin, validate(questionSchema), questionController.updateQuestion);
router.delete('/:id', auth, isAdmin, questionController.deleteQuestion);

module.exports = router; 