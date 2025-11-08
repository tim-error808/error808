const bcrypt = require("bcrypt")

const {handleCallback} = require("../../../lib");

const {BCRYPT_SALT} = require("../../../config/secrets");

const OAuth2ClientModels = require("../OAuth2ClientsModel");
const {conventionalizeClient} = require("../OAuth2ClientsModel");

const getClient = async (clientId, clientSecret, callback = null) =>
    await handleCallback(async () => {
        const hashedClientSecret = bcrypt.hashSync(clientSecret,BCRYPT_SALT.OAUTH2_CLIENT_SECRET);
        const client = await OAuth2ClientModels.findOne({
            _id: clientId,
            clientSecretHashed: hashedClientSecret,
        }).lean();
        return conventionalizeClient(client);
    }, callback);

module.exports = getClient;