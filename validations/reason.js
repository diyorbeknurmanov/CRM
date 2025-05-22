const Joi = require('joi');

const reasonSchema = Joi.object({
    reason_lid: Joi.string().required()
});

module.exports = reasonSchema;