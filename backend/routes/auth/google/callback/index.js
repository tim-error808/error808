const express = require('express');
const passport = require('passport');

const failureRouter = require('./failure');

const authGoogleCallbackSuccessController =
    require('../../../../controllers/auth/google/authGoogleCallbackSuccessController');

const router = express.Router();

router.get( '/', passport.authenticate( 'google', {
    failureRedirect: '/auth/google/callback/failure',
    authGoogleCallbackSuccessController
}));


router.use('/failure', failureRouter);

module.exports = router;
