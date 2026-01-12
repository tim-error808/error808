const TradesModel = require("../models/TradesModel");

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
        (listing) => listing._id
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
    await TradesModel.findOneAndUpdate(
        {
          _id: req.params.offerId,
        },
        {status: "accepted"},
    );
    return res.status(200).json({message: "Trade offer accepted"});
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: "Error accepting trade offer"});
  }
}

const declineTradeController = async (req, res) => {
  try {
    await TradesModel.findOneAndUpdate(
        {
          _id: req.params.offerId,
        },
        {status: "declined"},
    );
    return res.status(200).json({message: "Trade offer declined"});
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: "Error declining trade offer"});
  }
}

const deleteTradeController = async (req, res) => {
  try {
    await TradesModel.findOneAndUpdate(
        {
          _id: req.params.offerId,
        },
        {status: "deleted"},
    );
    return res.status(200).json({message: "Trade offer deleted"});
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: "Error deleting trade offer"});
  }
}

module.exports = {
  recievedTradesController,
  newTradeController,
  getMyTradesController,
  declineTradeController,
  acceptTradeController,
  deleteTradeController
};
