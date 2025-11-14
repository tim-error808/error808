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
    googleId: String,
    passwordHash: String,
    scope: Array,
    email: String,
    role: String,
    city: String,
    location: Object,
    profile: String,
    createdAt: Date,
    isActive: Boolean,
    token: String,
}))

module.exports = UsersModel;