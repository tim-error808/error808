//TODO: document the function
const passport = require("passport");

const verifyToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // console.log({err,user,info});
      return res.status(401).json({ message: "Unauthorized!" });
    }

    if (user.isActive == false) {
      return res.status(403).json({ message: "The account is deactivated." });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = verifyToken;
