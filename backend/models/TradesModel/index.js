const mongoose = require("mongoose");
const { Schema } = require("mongoose");

/**
 * Mongoose model for the `trades` MongoDB collection.
 *
 * @constant TradesModel
 *
 * @type {Model<Schema>}
 */
const TradesModel = mongoose.model(
  "trades",
  new Schema({
    createdAt: { type: Date, required: true, default: Date.now },
    initiatorId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    offeredListings: [
      { type: Schema.Types.ObjectId, ref: "listings", required: true },
    ],
    receiverId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    requestedListings: [
      { type: Schema.Types.ObjectId, ref: "listings", required: true },
    ],
    status: { type: String, required: true },
    lastCounterBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    isSeen: { type: Boolean, default: false },
  }),
);

module.exports = TradesModel;
