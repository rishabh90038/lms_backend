const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const auth = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { lessonSchema } = require('../validation/lesson');

// Public: List lessons for a course
router.get('/course/:courseId', lessonController.getLessonsByCourse);

// Admin: Create, update, delete lessons (add admin check later)
router.post('/', auth, isAdmin, validate(lessonSchema), lessonController.createLesson);
router.put('/:id', auth, isAdmin, validate(lessonSchema), lessonController.updateLesson);
router.delete('/:id', auth, isAdmin, lessonController.deleteLesson);

module.exports = router; 