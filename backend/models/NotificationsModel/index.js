const mongoose = require("mongoose");
const {Schema} = require("mongoose");

/**
 * Mongoose model for the `notifications` MongoDB collection.
 *
 * @constant NotificationsModel
 *
 * @type {Model<Schema>}
 */
const NotificationsModel = mongoose.model("notifications", new Schema({
    createdAt: {type: Date, required: true},
    isRead: {type: Boolean, required: true},
    link: {type: String, required: true},
    message: {type: String, required: true},
    type: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: "users", required: true }
}))

module.exports = NotificationsModel;