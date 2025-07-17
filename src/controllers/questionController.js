const { Question, Option } = require('../../models');

exports.getQuestionsByQuiz = async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: { quizId: req.params.quizId },
      include: [Option]
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const { quizId, text } = req.body;
    const question = await Question.create({ quizId, text });
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { text } = req.body;
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    await question.update({ text });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    await question.destroy();
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 