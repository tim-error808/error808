const {handleCallback} = require("../../../lib");

const OAuth2TokensModel = require("../OAuth2AccessTokensModel");
const {conventionalizeAccessToken} = require("../OAuth2AccessTokensModel");

const getAccessToken = async (accessToken, callback=null) =>
    await handleCallback( async () => {
        const token = await OAuth2TokensModel
            .findOne({accessToken:accessToken})
            .populate('client')
            .populate('user')
            .lean();
        return conventionalizeAccessToken(token);
    }, callback);

module.exports = getAccessToken;