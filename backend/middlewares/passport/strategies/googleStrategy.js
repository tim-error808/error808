const { Strategy } = require("passport-google-oauth20");

const {
  secrets: {
    GOOGLE_AUTH: { CLIENT_ID, CLIENT_SECRET },
  },
  LOCAL_TEST,
} = require("../../../config");
const UsersModel = require("../../../models/UsersModel");

const googleVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UsersModel.findOne({ googleId: profile.id });

    if (!user) {
      user = await UsersModel.create({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails?.[0]?.value,
        passwordHash: null,
        isActive: true,
        profile: {
          photoUrl: profile.photos?.[0]?.value || null,
          description: null,
          interests: [],
        },
        location: {
          city: null,
          latitude: null,
          longitude: null,
        },
        scope: ["user"],
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
};

const googleStrategyOptions = {
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: LOCAL_TEST?"http://localhost/auth/google/callback":"https://backend.error808.tech/auth/google/callback",
};

const googleStrategy = new Strategy(googleStrategyOptions, googleVerify);

module.exports = googleStrategy;
