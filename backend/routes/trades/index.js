const express = require("express");
const {
  recievedTradesController,
  newTradeController,
  getMyTradesController,
} = require("../../controllers/tradesController");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();

router.use(verifyToken);
router.get("/received", recievedTradesController);
router.get("/my", getMyTradesController);
router.post("/", newTradeController);

module.exports = router;
