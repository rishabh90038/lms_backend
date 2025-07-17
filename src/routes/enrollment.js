const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const auth = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { enrollSchema } = require('../validation/enrollment');

// Enroll in a course
router.post('/', auth, validate(enrollSchema), enrollmentController.enrollInCourse);
// List all courses a user is enrolled in
router.get('/my', auth, enrollmentController.getMyEnrollments);

module.exports = router; 