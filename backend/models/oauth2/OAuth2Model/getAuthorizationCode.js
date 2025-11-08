const {handleCallback} = require("../../../lib");

const OAuth2AuthorizationCodesModel = require('../OAuth2AuthorizationCodesModel');
const  {conventionalizeAuthorizationCode} = require('../OAuth2AuthorizationCodesModel');

const getAuthorizationCode = async (authorizationCode, callback = null) =>
    await handleCallback(async () => {
        const code = await OAuth2AuthorizationCodesModel
            .findOne({authorizationCode: authorizationCode})
            .populate('client')
            .populate('user')
            .lean();
        return conventionalizeAuthorizationCode(code);
    }, callback);

module.exports = getAuthorizationCode;