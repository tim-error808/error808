const mongoose = require("mongoose");
const {Schema} = mongoose;

/**
 * Conventional OAuth2 client Object
 *
 * ***Note:***
 *  Specified by the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getclient-clientid-clientsecret-callback|getClient}
 *  in the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html|model specification} of the `oauth2-server`.
 *
 * @typedef {Object.<string,*>}  OAuth2Client
 *
 * @property {string}        id             - A unique string identifying the client.
 * @property {Array<string>} [redirectUris] - Redirect URIs allowed for the client. Required for the authorization_code grant.
 * @property {Array<string>} grants         - Grant types allowed for the client.
 */

/**
 * Mongoose model for the `oauth2clients` MongoDB collection that is tied to {@link OAuth2RefreshToken}.
 *
 * ***Note:*** Based on the {@link OAuth2Client} with addition to its link with a user
 *
 * ***Implementation warning**:
 *  Every field that has a different name structure from conventional {@link OAuth2Client} requires extensive change of
 *  the OAuth2 model, therefore after changing this ensure that the OAuth2 model is changed accordingly.*
 *
 * @constant OAuth2ClientsModel
 *
 * @type {Model<Schema>}
 */
const OAuth2ClientsModel = mongoose.model("oauth2clients", new Schema({
    clientSecretHashed: {String,required:true},
    redirectUris: {Array},
    grants: {Array,required:true},
    user: {type: Schema.Types.ObjectId, ref: 'users'},
}));


/**
 * Conventionalize a client or conventionalize it internally
 *
 * @function conventionalizeClient
 *
 * @param {?{client: Object.<string,?>,[key: string]:*}|
 *          Object.<string,?>} object         - an object that needs to client conventionalized(or client itself)
 * @param {boolean}            internal=false - is client internal (otherwise the {@link object} itself is a client)
 *
 * @returns {?OAuth2Client|{client:OAuth2Client, [key: string]:*}} - conventional client or object with it
 */
export const conventionalizeClient = require('./conventionalizeClient')

module.exports = OAuth2ClientsModel;
