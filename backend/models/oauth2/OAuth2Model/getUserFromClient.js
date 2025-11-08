const {Types: {ObjectId}} = require("mongoose");

const {handleCallback} = require("$/lib");

const OAuth2ClientModel = require("../OAuth2ClientsModel");

const getUserFromClient = async (client, callback = null) =>
    await handleCallback( async () =>
        await OAuth2ClientModel
            .findOne({_id: new ObjectId(client.id)})
            .populate("user")
            .lean().user
    , callback);

module.exports = getUserFromClient;