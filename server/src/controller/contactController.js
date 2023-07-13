const Contacts = require("../model/contactModel");
const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const auth = require("../global/auth");
let currentUser = require("../global/currentUser");

const contact_list = async (request, response) => {
  const userDetails = await currentUser.current_user(request);
  try {
    const findUser = await Contacts.findOne({ userId: userDetails.id });
    if (!findUser) return response.status(201).send(false);
    return response.status(201).json(findUser);
  } catch (error) {
    console.log(error);
    return response.status(400).send(error);
  }
};

const contact_create = async (request, response) => {
  findContact = await Contacts.findOne({
    userId: request.body.userId,
  });

  getContactUser = await Users.findOne({
    email: request.body.contactName,
  });

  console.log(getContactUser);

  let newContact = new Contacts({
    userId: request.body.userId,
    contacts: [
      {
        contactName: request.body.contactName,
        contactId: getContactUser._id,
      },
    ],
  });

  if (!findContact) {
    try {
      await newContact.save();
      return response.status(201).send(true);
    } catch (error) {
      console.log(error);
      return response.status(422).send(false);
    }
  } else {
    checkContacts = await Contacts.findOne({
      "contacts.contactName": request.body.contactName,
    });

    if (checkContacts) {
      return response.status(201).json(2);
    } else {
      getExisting = await Contacts.findByIdAndUpdate(findContact._id, {
        $push: {
          contacts: {
            contactName: request.body.contactName,
            contactId: getContactUser._id,
          },
        },
      });
      if (getExisting) return response.status(201).send(true);
    }
  }
};

const contact_delete = async (request, response) => {
  try {
    const deleteContact = await Contacts.findOneAndUpdate(
      { userId: request.body.userId },
      { $pull: { contacts: { _id: request.body.contactId } } },
      { new: true }
    );
    if (deleteContact) {
      return response.status(200).json(true);
    } else {
      return response.status(201).json({ error: "Contact not found" });
    }
  } catch (error) {
    return response.status(400).send(error);
  }
};

module.exports = {
  contact_list,
  contact_create,
  contact_delete,
};
