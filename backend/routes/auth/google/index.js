const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('google',{
    session: false,
    scope: ['profile', 'email']
}));

router.use('/callback', require('./callback'));

module.exports = router;