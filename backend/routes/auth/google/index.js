const express = require('express');
const passport = require('passport');

const googlePassportInit = require('./googlePassportInit');
const callbackRouter = require('./callback');

const router = express.Router();

googlePassportInit(router);
router.get('/', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

router.use('/callback',callbackRouter);

module.exports = router;




