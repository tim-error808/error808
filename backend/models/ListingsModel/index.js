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
    available: {type: Boolean, required: true, default: true},
    condition: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now},
    name: {type: String},
    genre: {type: String},
    publisher: {type: String},
    releaseYear: {type: Number},
    minPlayers:{type: Number},
    maxPlayers: {type: Number},
    playTime: {type: Number},
    difficulty: {type: Number},
    imageUrl: String,
    description: String,
    user: {type: Schema.Types.ObjectId, ref: "users", required: true }
}))

module.exports = ListingsModel;