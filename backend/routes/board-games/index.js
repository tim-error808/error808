const express = require('express');
const boardGamesController = require("../../controllers/boardGamesController");
const router = express.Router();
router.get('/', boardGamesController);


module.exports = router;