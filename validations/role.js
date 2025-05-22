const Joi = require("joi");

const roleValidation = Joi.object({
  name: Joi.string().min(2).max(50).required(),
});

module.exports = roleValidation;
