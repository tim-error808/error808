const {Types: {ObjectId}} = require("mongoose");

const {handleCallback} = require("../../../lib");

const OAuth2AuthorizationCodesModel = require("../OAuth2AuthorizationCodesModel");
const {conventionalizeAuthorizationCode} = require("../OAuth2AuthorizationCodesModel");

const saveAuthorizationCode = async (code, client, user, callback = null) =>
    await handleCallback(async () => {
        const authorizationCode = new OAuth2AuthorizationCodesModel({
            code: code.authorizationCode,
            expiresAt: code.expiresAt,
            redirectUri: code.redirectUri,
            scope: code.scope,
            client: new ObjectId(client.id),
            user: new ObjectId(user.id),
        });

        const saveAuthorizationCode = await authorizationCode
            .save()
            .populate("user")
            .populate("client")
            .lean();

        return conventionalizeAuthorizationCode(saveAuthorizationCode);
    }, callback);

module.exports = saveAuthorizationCode;