const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const auth = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { progressSchema } = require('../validation/progress');

// Mark lesson as completed
router.post('/complete', auth, validate(progressSchema), progressController.markLessonComplete);
// Get progress for a course
router.get('/course/:courseId', auth, progressController.getCourseProgress);

module.exports = router; 