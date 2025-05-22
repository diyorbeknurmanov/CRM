const Joi = require("joi");

const staffValidation = Joi.object({
  first_name: Joi.string()
    .min(3)
    .message("min 3 ta harf bolish kerak")
    .max(50)
    .message("max 50 ta belgi bolish kerak")
    .required(),
  last_name: Joi.string()
    .min(3)
    .message("min 3 ta harf bolish kerak")
    .max(50)
    .message("max 50 ta belgi bolish kerak")
    .required(),
  phone_nomer: Joi.string()
    .pattern(/^[0-9]{9,15}$/)
    .message(
      "Telefon raqami faqat raqamlardan iborat va 9-15 belgidan iborat bolishi kerak"
    )
    .required(),
  login: Joi.string().min(3).message("min  3 ta harf").required(),
  password: Joi.string()
    .min(4)
    .message("min 4 harf bolish kerak")
    .max(25)
    .message("max 25 bolish kerak")
    .required(),
  is_active: Joi.boolean().required().messages({
    "any.required": "is_active maydonini to'ldiring",
    "boolean.base": "is_active faqat true yoki false bo'lishi kerak",
  }),
});

module.exports = staffValidation;
