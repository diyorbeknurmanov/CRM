const Joi = require("joi");

const lessonValidation = Joi.object({
  lesson_theme: Joi.string().required().messages({
    "any.required": "lesson_theme kirtilish shart",
  }),
  lesson_number: Joi.number(),
  group_id: Joi.number(),
  lesson_date: Joi.date().required().messages({
    "any.required": "lesson_date kirtilish shart",
  }),
});

module.exports = lessonValidation;
