const Joi = require("joi");

const studentsValidation = Joi.object({
  lid_id: Joi.number(),
  first_name: Joi.string().min(2).max(50).required().messages({
    "any.required": "Ism kiritilishi shart",
  }),
  last_name: Joi.string().min(2).max(50).required().messages({
    "any.required": "Familiya kiritilishi shart",
  }),
  phone_number: Joi.string()
    .pattern(/^\+998\d{9}$/)
    .required()
    .messages({
      "any.required": "Telefon raqami kiritilishi shart",
      "string.pattern.base": "Telefon raqami notogri",
    }),
  birthday: Joi.date().less("now").required().messages({
    "any.required": "Tugilgan sana kiritilishi shart",
    "date.less": "Tugilgan sana hozirgi vaqtdan oldin bolishi kerak",
  }),
  male: Joi.string().valid("male", "female").required().messages({
    "any.required": "Jins kiritilishi shart",
    "any.only": "Jins faqat 'male' yoki 'female' bolishi mumkin",
  }),
});

module.exports = studentsValidation;
