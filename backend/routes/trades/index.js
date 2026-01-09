const express = require('express');
const {recievedTradesController, newTradeController} = require('../../controllers/tradesController');
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();

router.use(verifyToken);
router.get('/recieved', recievedTradesController);
router.post('/', newTradeController);

module.exports = router