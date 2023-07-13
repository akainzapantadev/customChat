const express = require("express");
const router = express.Router();
const contactController = require("../controller/contactController");
const auth = require("../global/auth");

// userController
router.get("/contacts", auth.verify, contactController.contact_list);
router.post("/createContact", contactController.contact_create);
router.delete("/deleteContact", contactController.contact_delete);

router.route;
//   .patch(userController.user_update)
//   .put(userController.user_update)
//   .delete(userController.user_delete)
//   .get(userController.user_details);

module.exports = router;
