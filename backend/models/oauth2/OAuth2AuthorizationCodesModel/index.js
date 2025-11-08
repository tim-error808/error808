const mongoose = require("mongoose");
const {Schema} = mongoose;

const {conventionalizeClient} = require("../OAuth2ClientsModel");

/**
 * Conventional OAuth2 authorization code Object.
 *
 * ***Note:***
 *  Specified by the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getauthorizationcode-authorizationcode-callback|getAuthorizationCode}
 *  in the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html|model specification} of the `oauth2-server`.
 *
 * @typedef  {Object.<string,?>} OAuth2AuthorizationCode
 *
 * @property {string}      code          - The authorization code passed to getAuthorizationCode().
 * @property {Date}        expiresAt     - The expiry time of the authorization code.
 * @property {string}      [redirectUri] - The redirect URI of the authorization code.
 * @property {string}      scope         - The authorized scope of the authorization code.
 * @property {Object}      client        - The client associated with the authorization code.
 * @property {Object}      user          - The user associated with the authorization code.
 *
 * ***Note:*** Objects of this type can have other members but officially are not required by the server.
 */

/**
 * Mongoose model for the `oauth2authorizationCodes` MongoDB collection that is tied to {@link OAuth2AuthorizationCode}.
 *
 * ***Note:*** Based on the {@link OAuth2AuthorizationCode}
 *
 * ***Implementation warning**:
 *  Every field that has a different name structure from conventional {@link OAuth2AuthorizationCode} requires extensive change of
 *  the OAuth2 model, therefore after changing this ensure that the OAuth2 model is changed accordingly.*
 *
 * @constant OAuth2AuthorizationCodesModel
 *
 * @type {Model<Schema>}
 */
const OAuth2AuthorizationCodesModel = mongoose.model("oauth2authorizationCodes", new Schema({
    code: {type: String, required: true},
    expiresAt: {type:Date, required: true},
    redirectUri: String,
    scope: {type:String, required: true},
    client: {type:Schema.Types.ObjectId, ref:'clients', required:true},
    user: {type:Schema.Types.ObjectId, ref:'users',required:true},
}));

/**
 * Conventionalize the Authorization Code to the {@link OAuth2AccessToken} type that is specified by the `node-oauth2-server`
 * package
 *
 * @function conventionalizeAuthorizationCode
 *
 * @param {Object.<string,?>} code token to conventionalize
 *
 * @returns {?}
 */
export const conventionalizeAuthorizationCode = code => conventionalizeClient(code,true);

module.exports = OAuth2AuthorizationCodesModel;