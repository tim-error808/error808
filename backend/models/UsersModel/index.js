const mongoose = require("mongoose");
const {Schema} = require("mongoose");

/**
 * Mongoose model for the `users` MongoDB collection.
 *
 * @constant OAuth2RefreshTokensModel
 *
 * @type {Model<Schema>}
 */
const UsersModel = mongoose.model("users", new Schema({
    username: String,
    passwordHash: String,
    scope: String,
    email: String,
    city: String,
    location: Object,
    profile: Object,
    createdAt: Date,
    isActive: Boolean
}))

module.exports = UsersModel;