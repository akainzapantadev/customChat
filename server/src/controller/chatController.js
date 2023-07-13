const Chats = require("../model/chatModel");
const bcrypt = require("bcrypt");
const auth = require("../global/auth");
let currentUser = require("../global/currentUser");

const chat_display = async (request, response) => {
  // console.log(request.body, "test");
  try {
    const getChats = await Chats.findOne({ userId: request.body.userId });
    if (!getChats) return response.status(201).send(false);
    return response.status(201).json(getChats);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error);
  }
};

const chat_create = async (request, response) => {
  let newChat = new Chats({
    userId: request.body.userId,
    receiver: request.body.receiver,
    messages: [{ message: request.body.messages[0].message }],
  });

  const checkExistChat = await Chats.findOne({ userId: request.body.userId });

  if (!checkExistChat) {
    try {
      await newChat.save();
      return response.status(200).send(true);
    } catch (error) {
      console.log(error);
      return response.status(422).send(false);
    }
  } else {
    getExisting = await Chats.findByIdAndUpdate(checkExistChat._id, {
      $push: {
        messages: [
          {
            message: request.body.messages[0].message,
          },
        ],
      },
    });
  }
};

module.exports = {
  chat_display,
  chat_create,
};
