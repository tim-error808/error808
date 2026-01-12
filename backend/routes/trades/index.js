const express = require("express");
const {
  recievedTradesController,
  newTradeController,
  getMyTradesController,
  acceptTradeController, declineTradeController,
} = require("../../controllers/tradesController");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();

router.use(verifyToken);
router.get("/received", recievedTradesController);
router.get("/my", getMyTradesController);
router.post("/", newTradeController);
router.put("/:offerId/accept", acceptTradeController);
router.put("/:offerId/decline", declineTradeController);

module.exports = router;
