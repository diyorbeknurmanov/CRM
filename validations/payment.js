const Joi = require("joi");

const paymentValidation = Joi.object({
  student_id: Joi.number().integer().required().messages({
    "number.base": "Talaba ID raqam bo'lishi kerak",
    "any.required": "Talaba ID kiritilishi shart",
  }),

  payment_last_date: Joi.date().required().messages({
    "date.base": "Oxirgi to'lov sanasi noto'g'ri",
    "any.required": "Oxirgi to'lov sanasi kiritilishi shart",
  }),

  payment_date: Joi.date().required().messages({
    "date.base": "To'lov sanasi noto'g'ri",
    "any.required": "To'lov sanasi kiritilishi shart",
  }),

  price: Joi.number().precision(2).positive().required().messages({
    "number.base": "Narx raqam bo'lishi kerak",
    "number.positive": "Narx musbat bo'lishi kerak",
    "any.required": "Narx kiritilishi shart",
  }),

  is_paid: Joi.boolean().required().messages({
    "boolean.base":
      "To'langan yoki yo'q boolean qiymat bo'lishi kerak (true/false)",
    "any.required": "To'lov holati kiritilishi shart",
  }),

  total_attent: Joi.number().integer().min(0).required().messages({
    "number.base": "Darslar soni raqam bo'lishi kerak",
    "any.required": "Darslar soni kiritilishi shart",
  }),
});

module.exports = paymentValidation;
