const { Quiz, QuizAttempt, User } = require('../../models');

exports.getQuizzesByCourse = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({ where: { courseId: req.params.courseId } });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const { courseId, title } = req.body;
    const quiz = await Quiz.create({ courseId, title });
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { title } = req.body;
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    await quiz.update({ title });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    await quiz.destroy();
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getQuizAnalytics = async (req, res) => {
  try {
    const quizId = req.params.id;
    const attempts = await QuizAttempt.findAll({ where: { quizId } });
    if (attempts.length === 0) {
      return res.json({ averageScore: 0, totalAttempts: 0, topScorers: [] });
    }
    const totalScore = attempts.reduce((sum, a) => sum + a.score, 0);
    const averageScore = totalScore / attempts.length;
    // Optional: Top scorers
    const topAttempts = await QuizAttempt.findAll({
      where: { quizId },
      order: [['score', 'DESC']],
      limit: 5,
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    res.json({
      averageScore,
      totalAttempts: attempts.length,
      topScorers: topAttempts.map(a => ({
        user: a.User,
        score: a.score
      }))
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 