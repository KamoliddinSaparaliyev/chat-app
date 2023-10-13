const express = require("express");
const { hash, compare } = require("bcryptjs");
const { jwt } = require("../shared/config");
const { BadRequestError, NotFoundError } = require("../shared/errors");
const httpValidator = require("../shared/http-validator");
const { postUserSchema, loginUserSchema } = require("../schemas");
const User = require("../models/User");
const { sign } = require("jsonwebtoken");
const getAllUsers = require("../services/getAllUsers");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports.register = async (req, res, next) => {
  const { username, password, full_name } = req.body;

  try {
    httpValidator(req.body, postUserSchema);

    const existing = await User.findOne({ username });

    if (existing) throw new BadRequestError("Username already exist");

    const hashPwd = await hash(password, 10);

    await User.create({
      full_name,
      username,
      password: hashPwd,
    });

    res.status(201).json({ message: "Your Registration completed" });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports.getMe = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const result = await User.findById(user_id);

    if (!result) throw new NotFoundError("User not found");

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports.getUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports.login = async (req, res, next) => {
  try {
    httpValidator(req.body, loginUserSchema);

    const existing = await User.findOne({ username: req.body.username });

    if (!existing) throw new NotFoundError("Username or password wrong");

    const match = await compare(req.body.password, existing.password);

    if (!match) throw new BadRequestError("Username or password wrong");

    const token = sign({ user: { id: existing._id } }, jwt.secret, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
