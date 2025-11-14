const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const {secrets: {GOOGLE_AUTH}} = require("../../../config/");
const authGoogleVerifyController = require("../../../controllers/auth/google/authGoogleVerifyController");

const router = express.Router();

const callbackRouter = require('./callback');

passport.serializeUser((user, callback) => callback(null, user));
passport.deserializeUser((user, callback) => callback(null, user));
const strategy = new GoogleStrategy({
    clientID: GOOGLE_AUTH.CLIENT_ID,
    clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
    callbackURL: `https://error808-backend-ftcqdmg7fqcsf0gp.westeurope-01.azurewebsites.net/auth/google/callback`,
    scope: ['profile', 'email'],
    state: true,
},authGoogleVerifyController);

router.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1','key2']
}));

passport.use(strategy);
router.use(passport.initialize());
router.use(passport.session());

router.get('/', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

router.use('/callback',callbackRouter);

module.exports = router;




