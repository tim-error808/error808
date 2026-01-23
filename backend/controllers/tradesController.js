const TradesModel = require("../models/TradesModel");
const ListingsModel = require("../models/ListingsModel");
const MailController = require("./mailController");
const UsersModel = require("../models/UsersModel");
const mailComposition = require("../models/MailModel/mailComposition");

const recievedTradesController = async (req, res) => {
  try {
    const userId = req.user._id;
    const trades = await TradesModel.find({
      receiverId: userId,
      status: { $in: ["active", "counter"] },
    })
      .populate("offeredListings")
      .populate("requestedListings")
      .populate("initiatorId", "username email");

    await TradesModel.updateMany(
      {
        receiverId: userId,
        isSeen: false,
      },
      {
        $set: { isSeen: true },
      },
    );

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
      status: { $in: ["active", "counter"] },
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

    if (originalOfferId) {
      const originalOffer = await TradesModel.findById(originalOfferId)
        .populate("offeredListings")
        .populate("requestedListings");

      if (!originalOffer) {
        return res.status(404).json({ message: "Original offer not found" });
      }

      if (originalOffer?.lastCounterBy === userId) {
        return res
          .status(403)
          .json({ message: "You cannot counter twice in a row" });
      }

      originalOffer.offeredListings = requestedListings;
      originalOffer.requestedListings = offeredListings;
      originalOffer.status = "counter";
      originalOffer.lastCounterBy = userId;

      await originalOffer.save();

      return res.status(200).json({ message: "Trade countered successfully" });
    }

    await TradesModel.create({
      initiatorId: userId,
      receiverId,
      requestedListings,
      offeredListings,
      status: "active",
    });
    
    recieverUser = await UsersModel.findById(receiverId).lean()
    requesterUser = await UsersModel.findById(userId).lean()

    try {
      const composition = {
        ...mailComposition,
        to: recieverUser.email,
        mailType: "newoffer",
        textParameters: {
          userName: recieverUser.username,
          requesterName: requesterUser.username,
          requesterEmail: requesterUser.email
        },
      };

      await MailController(composition);
    } catch (err) {
      console.error(`Error sending new offer email to ${recieverUser.email}:`, err);
    }

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
      status: { $in: ["active", "counter"] },
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

    if (trade?.lastCounterBy === req.user._id) {
      return res
        .status(403)
        .json({ message: "You cannot accept your own counter" });
    }

    trade.status = "accepted";

    try {
      let initiator = await UsersModel.findById(trade.initiatorId).lean()
      let accepter = await UsersModel.findById(trade.receiverId).lean()
      let composition = {
        ...mailComposition,
        to: initiator.email,
        mailType: "acceptedoffer",
        textParameters: {
          accepterName: accepter.username,
          accepterEmail: acceptor.email,
          userName: initiator.username
        },
      };
      await MailController(composition);
    } catch (err) {
      console.error(`Error sending an trade accepted email:`, err);
    }

    await trade.save();

    let trades = await TradesModel.updateMany(
      {
        _id: { $ne: trade._id },
        status: { $in: ["active", "counter"] },
        $or: [
          { offeredListings: { $in: allListings } },
          { requestedListings: { $in: allListings } },
        ],
      },
      { status: "declined" },
    ).lean();

    for (const trade in trades) {
      try {
        let initiator = await UsersModel.findById(trade.initiatorId).lean()
        let reciever = await UsersModel.findById(trade.receiverId).lean()
        let composition = {
          ...mailComposition,
          to: initiator.email,
          mailType: "deletedoffer",
          textParameters: {
            userName: initiator.username
          },
        };
        await MailController(composition);
        composition.to = reciever.email;
        composition.textParameters.userName = reciever.username;
        await MailController(composition);
      } catch (err) {
        console.error(`Error sending an trade deleted email:`, err);
      }
    }

    return res.status(200).json({ message: "Trade offer accepted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error accepting trade offer" });
  }
};

const declineTradeController = async (req, res) => {
  try {
    const declinedTrade = await TradesModel.findOneAndUpdate(
      {
        _id: req.params.offerId,
      },
      { status: "declined" },
    ).lean();
    try {
      let initiator = await UsersModel.findById(declinedTrade.initiatorId).lean()
      let composition = {
        ...mailComposition,
        to: initiator.email,
        mailType: "declinedoffer",
        textParameters: {
          declinerName: req.user.name,
          userName: initiator.username
        },
      };
      await MailController(composition);
    } catch (err) {
      console.error(`Error sending a trade declined email:`, err);
    }
    return res.status(200).json({ message: "Trade offer declined" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error declining trade offer" });
  }
};

const deleteTradeController = async (req, res) => {
  try {
    const deletedTrade = await TradesModel.findOneAndUpdate(
      {
        _id: req.params.offerId,
      },
      { status: "deleted" },
    ).lean();
    try {
      let initiator = await UsersModel.findById(deletedTrade.initiatorId).lean()
      let reciever = await UsersModel.findById(deletedTrade.receiverId).lean()
      let composition = {
        ...mailComposition,
        to: initiator.email,
        mailType: "deletedoffer",
        textParameters: {
          userName: initiator.username
        },
      };
      await MailController(composition);
      composition.to = reciever.email;
      composition.textParameters.userName = reciever.username;
      await MailController(composition);
    } catch (err) {
      console.error(`Error sending an trade deleted email:`, err);
    }
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

    let value;
    const tradesWithRole = trades.map(
      (t) => (
        (value = t.initiatorId._id.toString() === userId.toString()),
        {
          ...t,
          offeredListings: t.offeredListings.map((o) => o.name),
          requestedListings: t.requestedListings.map((r) => r.name),
          role: value ? "initiator" : "receiver",
        }
      ),
    );

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

const getUnreadTradesCount = async (req, res) => {
  try {
    const userId = req.user._id;

    const count = await TradesModel.countDocuments({
      receiverId: userId,
      isSeen: false,
    });

    res.status(200).json({ count, message: "New offers count fetch success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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
  getUnreadTradesCount,
};
