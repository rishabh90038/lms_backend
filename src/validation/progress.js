const Joi = require('joi');

exports.progressSchema = Joi.object({
  lessonId: Joi.number().integer().required()
}); 