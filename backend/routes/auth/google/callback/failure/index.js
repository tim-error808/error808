const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("http://localhost:3000/auth/callback"); //https://proud-smoke-033478b03.3.azurestaticapps.net/auth/callback
});

module.exports = router;
