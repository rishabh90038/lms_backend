const Joi = require('joi');

exports.courseSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(5).required(),
  instructor: Joi.string().min(2).max(50).required(),
  price: Joi.number().min(0).required()
}); 