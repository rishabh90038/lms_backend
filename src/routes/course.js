const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const auth = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { courseSchema } = require('../validation/course');

// Public: List all courses (with pagination)
router.get('/', courseController.getAllCourses);
// Public: Get single course with lessons/quizzes
router.get('/:id', courseController.getCourseById);
router.get('/recommendations', auth, courseController.getRecommendations);

// Admin: Create, update, delete courses (add admin check later)
router.post('/', auth, isAdmin, validate(courseSchema), courseController.createCourse);
router.put('/:id', auth, isAdmin, validate(courseSchema), courseController.updateCourse);
router.delete('/:id', auth, isAdmin, courseController.deleteCourse);

module.exports = router; 