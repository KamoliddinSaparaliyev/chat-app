const Joi = require("joi");

module.exports.postUserSchema = {
  body: Joi.object({
    full_name: Joi.string().required(),
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().required(),
  }),
};

module.exports.loginUserSchema = {
  body: Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().required(),
  }),
};
