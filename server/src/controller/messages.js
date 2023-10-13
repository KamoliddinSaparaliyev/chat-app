const express = require("express");
const getAllRooms = require("../services/getAllChatRooms");
const getRoomMessages = require("../services/getRoomMessages");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports.listMessages = async (req, res, next) => {
  try {
    const result = await getRoomMessages(req.params);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
