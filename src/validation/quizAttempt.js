const Joi = require('joi');

exports.quizAttemptSchema = Joi.object({
  quizId: Joi.number().integer().required(),
  score: Joi.number().min(0).required()
}); 