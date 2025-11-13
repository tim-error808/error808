const express = require('express');
const googleRouter = require('./google');

const router = express.Router();

router.use('/google',googleRouter);

module.exports = router;