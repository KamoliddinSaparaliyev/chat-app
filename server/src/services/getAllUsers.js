const User = require("../models/User");

const getAllUsers = async () => {
  const result = await User.find({}).sort({ lastActivity: -1 });

  return result;
};

module.exports = getAllUsers;
