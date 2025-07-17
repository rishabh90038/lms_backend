const { Course, Lesson, Quiz, Enrollment } = require('../../models');
const { Op } = require('sequelize');

exports.getAllCourses = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    const { count, rows: courses } = await Course.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      courses
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [Lesson, Quiz]
    });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructor, price } = req.body;
    const course = await Course.create({ title, description, instructor, price });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { title, description, instructor, price } = req.body;
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    await course.update({ title, description, instructor, price });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    await course.destroy();
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    // 1. Find courses the user is enrolled in
    const myEnrollments = await Enrollment.findAll({ where: { userId: req.user.id } });
    const myCourseIds = myEnrollments.map(e => e.courseId);

    // 2. Find other users who enrolled in those courses
    const otherEnrollments = await Enrollment.findAll({
      where: {
        courseId: { [Op.in]: myCourseIds },
        userId: { [Op.ne]: req.user.id }
      }
    });
    const otherUserIds = [...new Set(otherEnrollments.map(e => e.userId))];

    // 3. Find courses those users are enrolled in (excluding already enrolled)
    const recommendedEnrollments = await Enrollment.findAll({
      where: {
        userId: { [Op.in]: otherUserIds },
        courseId: { [Op.notIn]: myCourseIds }
      },
      include: [Course]
    });

    // 4. Return unique recommended courses
    const recommendedCourses = {};
    recommendedEnrollments.forEach(e => {
      recommendedCourses[e.courseId] = e.Course;
    });

    res.json({ recommendations: Object.values(recommendedCourses) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
