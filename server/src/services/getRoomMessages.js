const Message = require("../models/Message");
const { NotFoundError } = require("../shared/errors");
const getSingleRoom = require("./getSingleChatRoom");

const getRoomMessages = async ({ id }) => {
  if (!(await getSingleRoom(id))) throw new NotFoundError("Room not found");

  const result = await Message.find({
    room: id,
  }).populate("user_info room_info");

  return result;
};

module.exports = getRoomMessages;
