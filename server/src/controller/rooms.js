const express = require("express");
const getAllRooms = require("../services/getAllChatRooms");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports.listRooms = async (req, res, next) => {
  try {
    const result = await getAllRooms();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
