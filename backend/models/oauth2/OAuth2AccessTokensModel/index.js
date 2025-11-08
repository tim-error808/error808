const mongoose = require("mongoose");
const {Schema} = mongoose;

const {conventionalizeClient} = require("../OAuth2ClientsModel");

/**
 * Conventional OAuth2 access token Object.
 *
 * ***Note:***
 *  Specified by the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getaccesstoken-accesstoken-callback|getAccessToken}
 *  in the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html|model specification} of the `oauth2-server`.
 *
 * @typedef {Object.<string,*>} OAuth2AccessToken
 *
 * @property {string} accessToken          - The access token passed to getAccessToken().
 * @property {Date}   accessTokenExpiresAt - The expiry time of the access token.
 * @property {String} scope                - The authorized scope of the access token.
 * @property {Object} client               - The client associated with the access token.
 * @property {Object} user                 - The user associated with the access token.
 *
 * ***Note:*** Objects of this type can have other members but officially are not required by the server.
 */


/**
 * Mongoose model for the `oauth2accessTokens` MongoDB collection that is tied to {@link OAuth2AccessToken}.
 *
 * ***Note:*** Based on the {@link OAuth2AccessToken}
 *
 * ***Implementation warning**:
 *  Every field that has a different name structure from conventional {@link OAuth2AccessToken} requires extensive change of
 *  the OAuth2 model, therefore after changing this ensure that the OAuth2 model is changed accordingly.*
 *
 * @constant OAuth2AccessTokensModel
 *
 * @type {Model<Schema>}
 */
const OAuth2AccessTokensModel = mongoose.model("oauth2accessTokens", new Schema({
    accessToken: {type:String, required:true},
    accessTokenExpiresAt: {type:Date, required:true},
    scope: {type:String, required:true},
    client: {type: Schema.Types.ObjectId, ref: 'clients',required: true},
    user: {type: Schema.Types.ObjectId, ref: 'users', required: true},
}));

/**
 * Conventionalize the Access token to the {@link OAuth2AccessToken}
 *
 * @function conventionalizeAccessToken
 *
 * @param {Object.<string,?>} token token to conventionalize
 *
 * @returns {OAuth2AccessToken} conventional access token
 */
export const conventionalizeAccessToken = token => conventionalizeClient(token,true);


module.exports = OAuth2AccessTokensModel