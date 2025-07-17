const Joi = require('joi');

exports.questionSchema = Joi.object({
  quizId: Joi.number().integer().required(),
  text: Joi.string().min(2).max(255).required()
}); 