const { Progress, Lesson } = require('../../models');

exports.markLessonComplete = async (req, res) => {
  try {
    const { lessonId } = req.body;
    // Prevent duplicate completion
    const exists = await Progress.findOne({ where: { userId: req.user.id, lessonId } });
    if (exists) return res.status(400).json({ message: 'Already marked as complete' });
    const progress = await Progress.create({ userId: req.user.id, lessonId, completedAt: new Date() });
    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getCourseProgress = async (req, res) => {
  try {
    // Get all lessons for the course
    const lessons = await Lesson.findAll({ where: { courseId: req.params.courseId } });
    const lessonIds = lessons.map(l => l.id);
    // Get completed lessons for user
    const completed = await Progress.findAll({ where: { userId: req.user.id, lessonId: lessonIds } });
    const percent = lessons.length ? Math.round((completed.length / lessons.length) * 100) : 0;
    res.json({ totalLessons: lessons.length, completedLessons: completed.length, percentCompleted: percent });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 