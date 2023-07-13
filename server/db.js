require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
  const connection = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", () => console.log(`Connected database: MongoDB Atlas`));
};
