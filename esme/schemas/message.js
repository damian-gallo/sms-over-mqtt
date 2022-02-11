const Joi = require("joi");

module.exports = Joi.object({
  content: Joi.string().required(),
  address: Joi.string().required(),
});
