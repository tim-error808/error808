const {handleCallback} = require("../../../lib");

const OAuth2AccessTokensModel = require('../OAuth2AccessTokensModel');

const {validateScope} = require('./');

const verifyScope = async (token, scope,callback) =>
    await handleCallback(async ()=> {
        const accessToken = await OAuth2AccessTokensModel.findOne({accessToken: token})
            .populate('user')
            .lean();
        const verifiedScope = validateScope(accessToken.user, null, scope).filter(element => accessToken.scope.includes(element));
        return verifiedScope.length === scope.length;
    }, callback);

module.exports = verifyScope;