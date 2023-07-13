const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const auth = require("../global/auth");
let currentUser = require("../global/currentUser");

// Display All users Data
const users_display = async (request, response) => {
  try {
    const getUsers = await Users.find();
    if (!getUsers) return response.status(201).send("No users found yet");
    return response.status(201).json(getUsers);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error);
  }
};

// check email user
const users_check_email = async (request, response) => {
  try {
    findUser = await Users.findOne({ email: request.body.email });
    if (!findUser) return response.status(201).send(false);
    return response.status(201).send(true);
  } catch (error) {
    return response.status(400).send(error);
  }
};

// Create New user
const user_create = async (request, response) => {
  let newUser = new Users({
    name: request.body.name,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, 10),
  });

  findUser = await Users.findOne({ email: request.body.email });
  if (!findUser) {
    try {
      await newUser.save();
      return response.status(201).json({
        status: "success",
        msg: "Registration successs",
        data: newUser,
      });
    } catch (error) {
      console.log(error);
      return response.status(422).send(false);
    }
  } else {
    return response.status(201).send("Email exists");
  }
};

const user_login = async (request, response) => {
  try {
    findUser = await Users.findOne({ email: request.body.email });

    if (!findUser) {
      return response.status(201).send(false);
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        request.body.password,
        findUser.password
      );

      if (isPasswordCorrect) {
        return response
          .status(201)
          .json({ access: auth.createAccessToken(findUser) });
        console.log("success");
      } else {
        return response.status(201).json({ status: "Incorrect password" });
      }
    }
  } catch (error) {
    return response.status(500).json({ status: "error login" });
  }
};

const user_profile = async (request, response) => {
  const userDetails = await currentUser.current_user(request);
  try {
    const findUser = await Users.findById(userDetails.id);
    if (!findUser) return response.status(201).send("User does not exist");
    return response.status(201).json(findUser);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error);
  }
};

module.exports = {
  users_display,
  user_create,
  user_login,
  user_profile,
  users_check_email,
};
