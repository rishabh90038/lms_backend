const { Option } = require('../../models');

exports.getOptionsByQuestion = async (req, res) => {
  try {
    const options = await Option.findAll({ where: { questionId: req.params.questionId } });
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createOption = async (req, res) => {
  try {
    const { questionId, text, isCorrect } = req.body;
    const option = await Option.create({ questionId, text, isCorrect });
    res.status(201).json(option);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateOption = async (req, res) => {
  try {
    const { text, isCorrect } = req.body;
    const option = await Option.findByPk(req.params.id);
    if (!option) return res.status(404).json({ message: 'Option not found' });
    await option.update({ text, isCorrect });
    res.json(option);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteOption = async (req, res) => {
  try {
    const option = await Option.findByPk(req.params.id);
    if (!option) return res.status(404).json({ message: 'Option not found' });
    await option.destroy();
    res.json({ message: 'Option deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 