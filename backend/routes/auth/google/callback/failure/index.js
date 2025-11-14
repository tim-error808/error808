const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Google authentication failed');
    res.redirect(`https://proud-smoke-033478b03.3.azurestaticapps.net/auth/callback`);
})

module.exports = router;