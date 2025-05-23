const Joi = require("joi");

const lidValidation = Joi.object({
  first_name: Joi.string().min(3).required().messages({
    "string.min": "first_name kamida 3 ta harf bo'lishi kerak",
    "any.required": "first_name kiritish shart",
  }),
  last_name: Joi.string().min(3).required().messages({
    "string.min": "last_name kamida 3 ta harf bo'lishi kerak",
    "any.required": "last_name kiritish shart",
  }),
  phone_number: Joi.string()
    .pattern(/^\+998\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Telefon raqamni +998XXXXXXXXX formatda kiriting",
      "any.required": "phone_number kiritish shart",
    }),
  target_id: Joi.number(),
  stage_id: Joi.number(),
  test_date: Joi.date().iso().messages({
    "date.base": "test_date noto'g'ri formatda",
    "date.format": "test_date ISO formatda bo'lishi kerak",
  }),
  lesson_date: Joi.string().strict().messages({
    "string.base": "lesson_date faqat string bo'lishi kerak",
  }),
  lesson_time: Joi.string().strict().messages({
    "string.base": "lesson_time faqat string bo'lishi kerak",
  }),
  group_id: Joi.number(),
  status_id: Joi.number(),
  reason_id: Joi.number(),
});

module.exports = lidValidation;
