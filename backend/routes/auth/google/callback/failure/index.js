const express = require('express');

const {authGoogleCallbackFailureController} = require('../../../../../controllers/auth/google');

const router = express.Router();

router.get('/', authGoogleCallbackFailureController);

module.exports = router;