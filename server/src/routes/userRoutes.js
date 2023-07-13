const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../global/auth");

// userController
router.get("/users", userController.users_display);
router.post("/checkEmail", userController.users_check_email);
router.get("/userDetails", auth.verify, userController.user_profile);
router.post("/createUser", userController.user_create);
router.post("/loginUser", userController.user_login);

router.route;
//   .patch(userController.user_update)
//   .put(userController.user_update)
//   .delete(userController.user_delete)
//   .get(userController.user_details);

module.exports = router;
