const mongoose = require("mongoose");
const {Schema} = require("mongoose");

/**
 * Mongoose model for the `wishlist` MongoDB collection.
 *
 * @constant WishlistModel
 *
 * @type {Model<Schema>}
 */
const WishlistModel = mongoose.model("wishlist", new Schema({
    games: [{type: Schema.Types.ObjectId , required: true, ref: "games"}],
    notificationsEnabled: {type: Boolean, required: true},
    userId: {type: Schema.Types.ObjectId, required: true, ref: "users"}
}))

module.exports = WishlistModel;