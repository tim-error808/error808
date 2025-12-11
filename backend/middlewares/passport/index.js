const passport = require("passport");
const {
  secrets: { GOOGLE_AUTH },
} = require("../../config");
const UsersModel = require("../../models/UsersModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  UsersModel.findById(id).then((user) => done(null, user));
});

module.exports = passport;
