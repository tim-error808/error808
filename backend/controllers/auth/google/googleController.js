const passport = require("passport");

const googleController = passport.authenticate("google", {
  scope: ["profile", "email"],
});

module.exports = googleController;