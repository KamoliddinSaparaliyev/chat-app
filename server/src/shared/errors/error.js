const express = require("express");
const {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
} = require(".");

/**
 * @param {express.Response} res
 * @param {express.ErrorRequestHandler} err
 */
const errorMiddlewareFunc = (err, req, res, next) => {
  let status = 500;

  if (err instanceof BadRequestError) status = 400;
  else if (err instanceof UnauthorizedError) status = 401;
  else if (err instanceof ForbiddenError) status = 403;
  else if (err instanceof NotFoundError) status = 404;

  console.log(err.message);

  return res.status(status).json({ error: err.message });
};
module.exports = { errorMiddlewareFunc };
