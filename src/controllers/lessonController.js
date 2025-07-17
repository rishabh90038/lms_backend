const { Lesson } = require('../../models');

exports.getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.findAll({ where: { courseId: req.params.courseId } });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createLesson = async (req, res) => {
  try {
    const { courseId, title, videoUrl, resources } = req.body;
    const lesson = await Lesson.create({ courseId, title, videoUrl, resources });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const { title, videoUrl, resources } = req.body;
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    await lesson.update({ title, videoUrl, resources });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    await lesson.destroy();
    res.json({ message: 'Lesson deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 