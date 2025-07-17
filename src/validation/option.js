const Joi = require('joi');

exports.optionSchema = Joi.object({
  questionId: Joi.number().integer().required(),
  text: Joi.string().min(1).max(255).required(),
  isCorrect: Joi.boolean().required()
}); 