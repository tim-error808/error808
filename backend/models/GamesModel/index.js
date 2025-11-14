const mongoose = require("mongoose");
const {Schema} = require("mongoose");

/**
 * Mongoose model for the `games` MongoDB collection.
 *
 * @constant GamesModel
 *
 * @type {Model<Schema>}
 */
const GamesModel = mongoose.model("games", new Schema({
    name: String,
    genre: String,
    publisher: String,
    releaseYear: Number,
    minPlayers:Number,
    maxPlayers: Number,
    playTime: Number,
    difficulty: Number,
    imageUrl: String,
    description: String
}))

module.exports = GamesModel;