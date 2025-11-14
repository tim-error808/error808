const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('google',{
    session: false,
    scope: ['profile', 'email']
}));

module.exports = router;