const express = require("express");
const {
  recievedTradesController,
  newTradeController,
  getMyTradesController,
  acceptTradeController,
  declineTradeController,
  deleteTradeController,
  historyTradeController
} = require("../../controllers/tradesController");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();

router.use(verifyToken);
router.get("/received", recievedTradesController);
router.get("/history", historyTradeController);
router.get("/my", getMyTradesController);
router.post("/", newTradeController);
router.put("/:offerId/accept", acceptTradeController);
router.put("/:offerId/decline", declineTradeController);
router.put("/:offerId/delete",deleteTradeController)

module.exports = router;
