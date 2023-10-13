const { hashSync } = require("bcryptjs");

const usersSeedData = [
  {
    username: "user1",
    email: "user1@example.com",
    password: hashSync("password123", 10),
  },
  {
    username: "user2",
    email: "user2@example.com",
    password: hashSync("password123", 10),
  },
  {
    username: "user3",
    email: "user3@example.com",
    password: hashSync("password123", 10),
  },
];

const roomsSeedData = [
  {
    name: "Javascript",
  },
  {
    name: "NodeJS",
  },
  {
    name: "ReactJS",
  },
];

module.exports = {
  usersSeedData,
  roomsSeedData,
};
