const express = require("express");

const googleRouter = require("./google");
const authController = require("../../controllers/authController");

const router = express.Router();

router.use("/google", googleRouter);

router.route("/").post(authController.login);
router.route("/register").post(authController.register);
router.route("/logout").post(authController.logout);
router.route("/refresh").post(authController.refresh);

module.exports = router;
