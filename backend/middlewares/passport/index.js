//TODO: document the functions

const passport = require("passport");
const {googleStrategy, jwtStrategy} = require("./strategies")

passport.use(googleStrategy);

passport.use(jwtStrategy);

module.exports = passport;
