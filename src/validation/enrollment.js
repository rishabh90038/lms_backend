const Joi = require('joi');

exports.enrollSchema = Joi.object({
  courseId: Joi.number().integer().required()
}); 