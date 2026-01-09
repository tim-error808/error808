const mongoose = require("mongoose");
const { Schema } = require("mongoose");

/**
 * Mongoose model for the `trades` MongoDB collection.
 *
 * @constant TradesModel
 *
 * @type {Model<Schema>}
 */
const TradesModel = mongoose.model("trades", new Schema({
    createdAt: { type: Date, required: true, default: Date.now },
    initiatorId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    message: {type: String},
    offeredListings: [{ type: Schema.Types.ObjectId, ref: "listings", required: true }],
    receiverId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    requestedListings: [{ type: Schema.Types.ObjectId, ref: "listings", required: true }],
    status: { type: String, required: true }
}));

module.exports = TradesModel;
