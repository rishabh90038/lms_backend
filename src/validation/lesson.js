const Joi = require('joi');

exports.lessonSchema = Joi.object({
  courseId: Joi.number().integer().required(),
  title: Joi.string().min(2).max(100).required(),
  videoUrl: Joi.string().uri().required(),
  resources: Joi.string().allow('').optional()
}); 