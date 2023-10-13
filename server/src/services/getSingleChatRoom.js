const Room = require("../models/Room");

const getSingleRoom = async (id) => {
  const result = await Room.findById(id);

  if (!result) throw new Error("Room not found");

  return result;
};

module.exports = getSingleRoom;
