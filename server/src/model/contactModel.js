const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Name is required"],
  },
  contacts: [
    {
      contactName: {
        type: String,
      },
      contactId: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Contact", contactSchema);
