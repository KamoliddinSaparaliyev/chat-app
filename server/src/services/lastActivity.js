const Room = require("../models/Room");
const { NotFoundError } = require("../shared/errors");

const lastActivity = async (room) => {
  const result = await Room.findByIdAndUpdate(
    room,
    {
      lastActivity: new Date(),
    },
    { new: true }
  );

  if (!result) throw new NotFoundError("Room not found");

  return result;
};

module.exports = lastActivity;
