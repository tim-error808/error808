const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const {REST_API_PORT, secrets: {GOOGLE_AUTH}} = require("../../../config/");
const authGoogleVerifyController = require("../../../controllers/auth/google/authGoogleVerifyController");

const googlePassportInit = (router) =>{
    router.use(session({
        secret: process.env.SESSION_SECRET || 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    }));
    const strategy = new GoogleStrategy({
        clientID: GOOGLE_AUTH.CLIENT_ID,
        clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
        callbackURL: `https://error808-backend-ftcqdmg7fqcsf0gp.westeurope-01.azurewebsites.net/auth/google/callback`,
        scope: ['profile', 'email'],
        state: true,
    },authGoogleVerifyController);
    passport.use(strategy);
    passport.serializeUser((user, callback) => callback(null, user));
    passport.deserializeUser((user, callback) => callback(null, user));
    router.use(passport.initialize());
    router.use(passport.session());
}

module.exports = googlePassportInit;
