const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const googlePassportInit = require('./googlePassportInit');
const callbackRouter = require('./callback');

const router = express.Router();

googlePassportInit(router);

router.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1','key2']
}));

router.get('/', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

router.use('/callback',callbackRouter);

module.exports = router;




