const mongoose = require("mongoose");
const {Schema} = require("mongoose");

/**
 * Mongoose model for the `users` MongoDB collection.
 *
 * @constant UsersModel
 *
 * @type {Model<Schema>}
 */
const UsersModel = mongoose.model("users", new Schema({
    
  username: { type: String, required: true },
  email: { type: String, required: true },
  googleId: { type: String },
  passwordHash: { type: String },
  scope: { type: Schema.Types.Mixed, required: true },
  isActive: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  token: { type: String },

  location: {
    city: { type: String },
    latitude: { type: Number },
    longitude: { type: Number }
  },
  profile: {
    description: { type: String },
    interests: [{ type: String }],
    photoUrl: { type: String }
  }
}));

module.exports = UsersModel;
