const Room = require("../models/Room");

const getAllRooms = async () => {
  const result = await Room.find({}).sort({ lastActivity: -1 });

  return result;
};

module.exports = getAllRooms;
