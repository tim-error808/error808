const express = require('express');
const {recievedTradesController, newTradeController} = require('../../controllers/tradesController');
const router = express.Router();

router.get('/recieved', recievedTradesController);
router.post('/', newTradeController);

module.exports = router;