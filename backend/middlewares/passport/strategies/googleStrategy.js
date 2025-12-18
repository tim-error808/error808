const {Strategy} = require("passport-google-oauth20")

const { REST_API_PORT, secrets: {GOOGLE_AUTH: {CLIENT_ID, CLIENT_SECRET}} } = require("../../../config");
const UsersModel = require('../../../models/UsersModel');

const googleVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UsersModel.findOne({ googleId: profile.id });

    if (!user) {
      user = await UsersModel.create({
        email: profile.emails[0].value,
        username: profile.emails[0].value.split("@")[0],
        googleId: profile.id,
        scope: ["user"],
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}

const googleStrategyOptions = {
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: `http://localhost:3000/auth/google/callback`,
}

const googleStrategy = new Strategy(googleStrategyOptions,googleVerify);

module.exports = googleStrategy;