const Message = require("../models/Message");
const User = require("../models/User");
const { NotFoundError } = require("../shared/errors");
const getSingleRoom = require("./getSingleChatRoom");

const sendMessage = async ({ user, message, room }) => {
  if (!(await getSingleRoom(room))) throw new NotFoundError("Room not found");

  if (!(await User.findById(user))) throw new NotFoundError("User not found");

  const result = await Message.create({
    message,
    room,
    user,
  });

  return result;
};

module.exports = sendMessage;
