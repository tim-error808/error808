const {Types: {ObjectId}} = require("mongoose");

const {handleCallback} = require("../../../lib");

const OAuth2RefreshTokensModel = require('../OAuth2RefreshTokensModel')

const revokeToken = async (token, callback = null) =>
    await handleCallback(async ()=>{
        const result = await OAuth2RefreshTokensModel
            .deleteOne({_id: new ObjectId(token.id)}).exec();
        return result.deletedCount > 0;
    },callback);
module.exports = revokeToken;