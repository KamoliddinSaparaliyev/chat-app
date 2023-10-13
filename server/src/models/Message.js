const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    id: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

messageSchema.virtual("room_info", {
  ref: "Room",
  localField: "room",
  foreignField: "_id",
  justOne: true,
});

messageSchema.virtual("user_info", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
  justOne: true,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
