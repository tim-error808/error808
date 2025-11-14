const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const {REST_API_PORT, secrets: {GOOGLE_AUTH}} = require("../../../config/");
const authGoogleVerifyController = require("../../../controllers/auth/google/authGoogleVerifyController");

const googlePassportInit = () =>{
    const strategy = new GoogleStrategy({
        clientID: GOOGLE_AUTH.CLIENT_ID,
        clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
        callbackURL: `localhost:${REST_API_PORT}/auth/google/callback`,
        scope: ['profile', 'email'],
        state: true,
    },authGoogleVerifyController);
    passport.use(strategy);
    passport.serializeUser((user, callback) => callback(null, user));
    passport.deserializeUser((user, callback) => callback(null, user));
    passport.initialize();
}

module.exports = googlePassportInit;
