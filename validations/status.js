const Joi = require("joi");

const statusValidation = Joi.object({
  status: Joi.string()
    .min(3)
    .message("min 3 ta harf bolish kerak")
    .trim()
    .required(),
});

module.exports = statusValidation;
