const mongoose = require("mongoose");
const {Schema} = mongoose;

const {conventionalizeClient} = require("$/Models/OAuth2ClientsModel");


/**
 * Conventional OAuth2 refresh token Object.
 *
 * ***Note:***
 *  Specified by the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getrefreshtoken-refreshtoken-callback|getRefreshToken}
 *  in the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html|model specification} of the `oauth2-server`.
 *
 * @typedef {Object.<string,*>} OAuth2RefreshToken
 *
 * @property {string} refreshToken            - The refresh token
 * @property {Date}   [refreshTokenExpiresAt] - The expiry time of the refresh token.
 * @property {String} scope                   - The authorized scope of the access token.
 * @property {Object} client                  - The client associated with the access token.
 * @property {Object} user                    - The user associated with the access token.
 *
 * ***Note:*** Objects of this type can have other members but officially are not required by the server.
 */

/**
 * Mongoose model for the `oauth2refreshTokens` MongoDB collection that is tied to {@link OAuth2RefreshToken}.
 *
 * ***Note:*** Based on the {@link OAuth2RefreshToken}
 *
 * ***Implementation warning**:
 *  Every field that has a different name structure from conventional {{@link OAuth2RefreshToken}} requires extensive change of
 *  the OAuth2 model, therefore after changing this ensure that the OAuth2 model is changed accordingly.*
 *
 * @constant OAuth2RefreshTokensModel
 *
 * @type {Model<Schema>}
 */
const OAuth2RefreshTokensModel = mongoose.model("oauth2refreshTokens", new Schema({
    refreshToken: {type:String, required:true},
    refreshTokenExpiresAt: Date,
    scope: {type:String, required: true},
    client: {type: Schema.Types.ObjectId, ref: 'clients',required: true},
    user: {type: Schema.Types.ObjectId, ref: 'users',required: true},
}));

/**
 * Conventionalize the Access token to the {@link OAuth2RefreshToken}
 *
 * @function conventionalizeRefreshToken
 *
 * @param {Object.<string,?>} token token to conventionalize
 *
 * @returns {OAuth2RefreshToken} conventional refresh token
 */
export const conventionalizeRefreshToken = token => conventionalizeClient(token,true);

module.exports = OAuth2RefreshTokensModel;