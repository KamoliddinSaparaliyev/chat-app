const Joi = require("joi");

const pageSchema = Joi.object({
  limit: Joi.number().integer().min(1).default(10).required(),
  offset: Joi.number()
    .integer()
    .min(0)
    .default(0)
    .when("limit", {
      is: Joi.exist(),
      then: Joi.number().integer().min(0).required(),
      otherwise: Joi.forbidden(),
    }),
});

function buildSortSchema(validFields) {
  return Joi.object({
    by: Joi.string()
      .valid(...validFields)
      .default(validFields[0]),
    order: Joi.string().valid("asc", "desc").default("asc"),
  });
}

const idValid = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

module.exports = { pageSchema, buildSortSchema, idValid };
