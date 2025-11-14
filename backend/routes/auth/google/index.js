const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const {secrets: {GOOGLE_AUTH}} = require("../../../config/");
const authGoogleVerifyController = require("../../../controllers/auth/google/authGoogleVerifyController");

const router = express.Router();

const callbackRouter = require('./callback');
router.get('/', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

router.use('/callback',callbackRouter);

module.exports = router;




