const express = require("express");
const router = express.Router();
const chatController = require("../controller/chatController");
const auth = require("../global/auth");

// userController
router.post("/chats", auth.verify, chatController.chat_display);
router.post("/addChat", chatController.chat_create);
// router.post("/deleteChat", chatController.chat_delete);

router.route;
//   .patch(userController.user_update)
//   .put(userController.user_update)
//   .delete(userController.user_delete)
//   .get(userController.user_details);

module.exports = router;
