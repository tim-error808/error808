const mongoose = require("mongoose");
const {Schema} = require("mongoose");

/**
 * Mongoose model for the `listings` MongoDB collection.
 *
 * @constant ListingsModel
 *
 * @type {Model<Schema>}
 */
const ListingsModel = mongoose.model("listings", new Schema({
    available: {type: Boolean, required: true},
    condition: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now},
    description: {type: String},
    game: {type: Schema.Types.ObjectId, ref: "games", required: true },
    images: [{ type: String, required: true }],
    user: {type: Schema.Types.ObjectId, ref: "users", required: true }
}))

module.exports = ListingsModel;