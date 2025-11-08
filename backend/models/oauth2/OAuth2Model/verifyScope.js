const {handleCallback} = require("../../../lib");

const OAuth2AccessTokensModel = require('../OAuth2AccessTokensModel');

const {validateScope} = require('./');

const verifyScope = async (accessToken, scope,callback) =>
    await handleCallback(async ()=> {
        const token = await OAuth2AccessTokensModel.findOne({accessToken: accessToken})
            .populate('user')
            .lean();
        const verifiedScope = validateScope(token.user, null, scope).filter(element => token.scope.includes(element));
        return verifiedScope.length === scope.length;
    }, callback);

module.exports = verifyScope;