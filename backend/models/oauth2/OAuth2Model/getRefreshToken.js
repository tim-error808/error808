const {handleCallback} = require("../../../lib");

const OAuth2RefreshTokensModel = require("../OAuth2RefreshTokensModel");
const {conventionalizeRefreshToken} = require("../OAuth2RefreshTokensModel");


const getRefreshToken = async (refreshToken, callback=null) =>
    handleCallback( async () => {
        const token = await OAuth2RefreshTokensModel
        .findOne({refreshToken:refreshToken})
        .populate('client')
        .populate('user')
        .lean();

        return conventionalizeRefreshToken(token);
    }, callback);

module.exports = getRefreshToken;