const passport = require("passport");
const {
  secrets: { GOOGLE_AUTH },
} = require("../../config");
const UsersModel = require("../../models/UsersModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JWTStragety = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_AUTH.CLIENT_ID,
      clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
      callbackURL: "http://localhost:80/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
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
  )
);

const cookieExtractor = (req) => {
  return req?.cookies?.access_token || null;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStragety(opts, async (payload, done) => {
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
  })
);
module.exports = passport;
