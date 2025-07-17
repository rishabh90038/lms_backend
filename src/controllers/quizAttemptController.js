const { QuizAttempt } = require('../../models');

exports.attemptQuiz = async (req, res) => {
  try {
    const { quizId, score } = req.body;
    const attempt = await QuizAttempt.create({ userId: req.user.id, quizId, score, attemptAt: new Date() });
    res.status(201).json(attempt);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getQuizAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.findAll({ where: { userId: req.user.id, quizId: req.params.quizId } });
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 