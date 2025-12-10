const passport = require("passport");
const express = require("express");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/auth/login", //https://proud-smoke-033478b03.3.azurestaticapps.net/auth/callback
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/auth/callback"); //https://proud-smoke-033478b03.3.azurestaticapps.net/auth/callback
  }
);

module.exports = router;
