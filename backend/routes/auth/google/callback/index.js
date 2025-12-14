const express = require("express");
const passport = require("passport");

const {callbackController} = require("../../../../controllers/auth/google")

const router = express.Router();

router.get("/",
    passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/auth/login", //https://proud-smoke-033478b03.3.azurestaticapps.net/auth/callback
    session: false,
  }),
    callbackController);
module.exports = router;
