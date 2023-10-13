const Joi = require("joi");
const { BadRequestError } = require("../errors");

/**
 * @param {{ body, params, query }} param0
 * @param {{ body: Joi.Schema }} schema
 * @returns
 */
const httpValidator = ({ body }, schema) => {
  if (body) {
    const { error } = schema.body.validate(body);

    if (error) throw new BadRequestError(error);
  }
};

module.exports = httpValidator;
