const express = require("express");
const passport = require("passport");

const { googleController } = require("../../../controllers/auth/google");

const callbackRouter = require("./callback");
const router = express.Router()

router.get("/",googleController);

router.use("/callback", callbackRouter);

module.exports = router;
