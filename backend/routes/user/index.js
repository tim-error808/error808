const express = require("express");
const userController = require("../../controllers/userController");
const passport = require("passport");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController
);

module.exports = router;
