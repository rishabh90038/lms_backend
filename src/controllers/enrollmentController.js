const { Enrollment, Course } = require('../../models');

exports.enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    // Prevent duplicate enrollment
    const exists = await Enrollment.findOne({ where: { userId: req.user.id, courseId } });
    if (exists) return res.status(400).json({ message: 'Already enrolled' });
    const enrollment = await Enrollment.create({ userId: req.user.id, courseId });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { userId: req.user.id },
      include: [Course]
    });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 