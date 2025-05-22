const Joi = require("joi");

const stageValidationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .message("minimum 2 ta belgi bolish kerak")
    .max(50)
    .message("maxsimum 50 ta belgi bolish kerak")
    .required(),
  description: Joi.string().max(500),
});

module.exports = stageValidationSchema;
