const Joi = require("joi");

const brachValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .message("min 3 harf kiriting")
    .max(50)
    .message("max 50 ta harf kirting")
    .trim()
    .required(),
  address: Joi.string().min(5).message("min 5 harf kirting").trim().required(),
  call_number: Joi.string().trim(),
});

module.exports = brachValidation;
