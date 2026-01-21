const TradesModel = require("../models/TradesModel");
const ListingsModel = require("../models/ListingsModel");

const recievedTradesController = async (req, res) => {
  try {
    const userId = req.user._id;
    const trades = await TradesModel.find({
      receiverId: userId,
      status: "active",
    })
      .populate("offeredListings")
      .populate("requestedListings")
      .populate("initiatorId", "username email");

    return res.status(200).json(trades);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching received trades" });
  }
};

const getMyTradesController = async (req, res) => {
  try {
    const userId = req.user._id;

    const trades = await TradesModel.find({
      initiatorId: userId,
      status: "active",
    })
      .populate("requestedListings")
      .populate("offeredListings")
      .populate("receiverId", "username email location");

    return res.status(200).json(trades);
  } catch (err) {
    console.error("Error fetching my trades:", err);
    return res.status(500).json({ message: "Failed to fetch your trades" });
  }
};

const newTradeController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { requestedListings, offeredListings, receiverId, originalOfferId } =
      req.body;

    let finalReceiverId = receiverId;
    let finalRequestedListings = requestedListings;
    let finalOfferedListings = offeredListings;

    if (originalOfferId) {
      const originalOffer = await TradesModel.findById(originalOfferId)
        .populate("offeredListings")
        .populate("requestedListings");

      if (!originalOffer) {
        return res.status(404).json({ message: "Original offer not found" });
      }

      finalReceiverId = originalOffer.initiatorId;
      finalOfferedListings = originalOffer.offeredListings.map(
        (listing) => listing._id,
      );
    }

    await TradesModel.create({
      initiatorId: userId,
      receiverId: finalReceiverId,
      requestedListings: finalRequestedListings,
      offeredListings: finalOfferedListings,
      status: "active",
    });

    return res.status(200).json({ message: "Trade request sent successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating trade request" });
  }
};

const acceptTradeController = async (req, res) => {
  try {
    const trade = await TradesModel.findOne({
      _id: req.params.offerId,
      status: "active",
    });

    if (!trade) {
      return res.status(404).json({ message: "Trade not found or inactive" });
    }

    const allListings = [...trade.requestedListings, ...trade.offeredListings];

    const validListings = await ListingsModel.find({
      _id: { $in: allListings },
      available: true,
    });

    if (validListings.length !== allListings.length) {
      return res
        .status(400)
        .json({ message: "Some listings are no longer available" });
    }

    await ListingsModel.updateMany(
      { _id: { $in: allListings } },
      { available: false },
    );

    trade.status = "accepted";
    await trade.save();

    await TradesModel.updateMany(
      {
        _id: { $ne: trade._id },
        status: "active",
        $or: [
          { offeredListings: { $in: allListings } },
          { requestedListings: { $in: allListings } },
        ],
      },
      { status: "declined" },
    );

    return res.status(200).json({ message: "Trade offer accepted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error accepting trade offer" });
  }
};

const declineTradeController = async (req, res) => {
  try {
    await TradesModel.findOneAndUpdate(
      {
        _id: req.params.offerId,
      },
      { status: "declined" },
    );
    return res.status(200).json({ message: "Trade offer declined" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error declining trade offer" });
  }
};

const deleteTradeController = async (req, res) => {
  try {
    await TradesModel.findOneAndUpdate(
      {
        _id: req.params.offerId,
      },
      { status: "deleted" },
    );
    return res.status(200).json({ message: "Trade offer deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting trade offer" });
  }
};

const historyTradeController = async (req, res) => {
  try {
    const userId = req.user._id;

    const trades = await TradesModel.find({
      $or: [{ initiatorId: userId }, { receiverId: userId }],
      status: { $ne: "active" },
    })
      .sort({ createdAt: -1 })
      .populate("offeredListings", "name")
      .populate("requestedListings", "name")
      .populate("initiatorId", "username email")
      .populate("receiverId", "username email")
      .lean();

    const tradesWithRole = trades.map((t) => ({
      ...t,
      role:
        t.initiatorId._id.toString() === userId.toString()
          ? "initiator"
          : "receiver",
    }));

    return res.status(200).json({
      trades: tradesWithRole,
      message: "Trade history fetch success",
    });
  } catch (err) {
    console.error("Error fetching trade history:", err);
    return res
      .status(500)
      .json({ message: "Error getting trade history of a user" });
  }
};

module.exports = {
  recievedTradesController,
  newTradeController,
  getMyTradesController,
  declineTradeController,
  acceptTradeController,
  deleteTradeController,
  historyTradeController,
};
