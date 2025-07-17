const Joi = require('joi');

exports.quizSchema = Joi.object({
  courseId: Joi.number().integer().required(),
  title: Joi.string().min(2).max(100).required()
}); 