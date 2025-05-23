const Joi = require("joi");

const student_lesson_validation = Joi.object({
  lesson_id: Joi.number().required().messages({
    "any.required": "lesson_id kiritilishi shart",
    "number.base": "lesson_id raqam bo'lishi kerak",
  }),
  student_id: Joi.number().required().messages({
    "any.required": "student_id kiritilishi shart",
    "number.base": "student_id raqam bo'lishi kerak",
  }),
  is_there: Joi.boolean().required().messages({
    "any.required": "is_there kiritilishi shart",
    "boolean.base": "is_there faqat true yoki false bo'lishi kerak",
  }),
  reason: Joi.string().allow(null, "").messages({
    "string.base": "reason matn bo'lishi kerak",
  }),
  be_paid: Joi.boolean().required().messages({
    "any.required": "be_paid kiritilishi shart",
    "boolean.base": "be_paid faqat true yoki false bo'lishi kerak",
  }),
});

module.exports = student_lesson_validation;
