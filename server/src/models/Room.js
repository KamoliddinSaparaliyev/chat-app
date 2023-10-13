const { default: mongoose } = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastActivity: { type: Date, default: Date.now },
  },
  {
    id: false,
    timestamps: false,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
