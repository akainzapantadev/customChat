const express = require("express");
const router = express.Router();
const auth = require("./auth");

current_user = async (request) => {
  const userData = auth.decode(request.headers.authorization);
  if (userData) {
    // console.log(
    //   "\x1b[35m",
    //   `current user: ${userData.email} \n isAdmin : ${userData.isAdmin}`
    // );

    return userData;
  } else {
    // console.log("\x1b[31m", "no active user (currentUser.js)");
  }
};

module.exports = {
  current_user,
};
