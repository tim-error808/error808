const passport = require('passport');
const express = require('express');

const router = express.Router();

router.get('/', passport.authenticate('google', {
    failureRedirect: 'https://proud-smoke-033478b03.3.azurestaticapps.net/auth/callback',
    session: false,
}), (req, res) => {
    res.redirect(`https://proud-smoke-033478b03.3.azurestaticapps.net/auth/callback?jwt=${req.user.token}`);
});

module.exports = router;