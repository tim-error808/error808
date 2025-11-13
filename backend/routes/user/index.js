const express = require('express');

const {authGoogleAuthenticateController} = require('../../controllers/auth/google');
const userController = require('../../controllers/user/userController')
const router = express.Router();
router.get('/',authGoogleAuthenticateController, userController);

module.exports = router;