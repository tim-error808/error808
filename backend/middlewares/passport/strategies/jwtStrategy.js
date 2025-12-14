const { Strategy } = require("passport-jwt");

const UsersModel = require('../../../models/UsersModel');
const {secrets: {JWT_SECRET}} = require('./../../../config');

const jwtVerify = async (payload, done) => {
  try {
    const user = await UsersModel.findById(payload.sub).select("-password");
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
}

const cookieExtractor = (req) => {
  return req?.cookies?.access_token || null;
};

const jwtStrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_SECRET,
};

const jwtStrategy = new Strategy(jwtStrategyOptions, jwtVerify)

module.exports = jwtStrategy;