const mongoose = require("mongoose");
const { db } = require("../shared/config");
const { usersSeedData, roomsSeedData } = require("./data");
const User = require("../models/User");
const Room = require("../models/Room");

mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

    return Promise.all([User.deleteMany({}), Room.deleteMany({})]);
  })
  .then(() => {
    console.log("Cleared existing data");

    return Promise.all([
      User.insertMany(usersSeedData),
      Room.insertMany(roomsSeedData),
    ]);
  })
  .then(() => {
    console.log("Seed data inserted");

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error seeding the database:", error);
  });
