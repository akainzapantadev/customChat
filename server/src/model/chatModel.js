const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  receiver: {
    type: String,
  },
  messages: [
    {
      message: {
        type: String,
      },
      timeStamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
