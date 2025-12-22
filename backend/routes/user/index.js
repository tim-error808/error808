const express = require("express");
const userController = require("../../controllers/userController");
const verifyToken = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.use(verifyToken);

router
  .route("/")
  .get(userController.getUserData)
  .put(upload.single("photo"), userController.updateUserData);

module.exports = router;
