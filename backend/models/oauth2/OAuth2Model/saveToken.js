const {Types: {ObjectId}} = require("mongoose");

const {handleCallback} = require("../../../lib");

const OAuth2AccessTokensModel = require("../OAuth2AccessTokensModel");
const {conventionalizeAccessToken} = require("../OAuth2AccessTokensModel");

const OAuth2RefreshTokensModel = require("../OAuth2RefreshTokensModel");

const saveToken = async (token, client, user, callback = null) =>
    await handleCallback(async ()=>{
        const accessToken = new OAuth2AccessTokensModel ({
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            scope: token.scope,
            client: new ObjectId(client.id),
            user: new ObjectId(user.id),
        });
        const refreshToken = new OAuth2RefreshTokensModel ({
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            scope: token.scope,
            client: new ObjectId(client.id),
            user: new ObjectId(user.id),
        })

        const savedAccessToken = await accessToken.save();
        let savedRefreshToken = {scope:null, client:null,user:null, ...{}}
        if(token.refreshToken) {
            savedRefreshToken = await refreshToken.save();
        }

        const populatedAccessToken = savedAccessToken
            .populate('user')
            .populate('client')
            .lean();

        const conventionalAccessToken = conventionalizeAccessToken(populatedAccessToken);

        const {scope,client,user,...reducedRefreshToken} = savedRefreshToken;

        return {...conventionalAccessToken, ...reducedRefreshToken};
    },callback);

module.exports = saveToken;