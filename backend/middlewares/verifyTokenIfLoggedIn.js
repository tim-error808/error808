const passport = require("passport");

const verifyTokenIfLoggedIn = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user) return next();
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = verifyTokenIfLoggedIn;