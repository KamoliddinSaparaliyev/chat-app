const config = require("../config");
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");
const express = require("express");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw new UnauthorizedError("Tizimga kiring");

    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded.user;

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isLoggedIn;
