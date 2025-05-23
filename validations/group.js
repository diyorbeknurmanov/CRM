const Joi = require("joi");

const groupValidation = Joi.object({
  name: Joi.string().min(3).required(),
  lesson_start_time: Joi.string().required(),
  lesson_end_time: Joi.string().required(),
  lessson_week_day: Joi.array().items(Joi.number()).min(1).required(),
  stage_id: Joi.number().optional(),
  branch_id: Joi.number().optional(),
  room_floor: Joi.number().optional(),
  room: Joi.string().optional(),
  lesson_quantity: Joi.number().required(),
  is_active: Joi.boolean().required(),
});

module.exports = groupValidation;
