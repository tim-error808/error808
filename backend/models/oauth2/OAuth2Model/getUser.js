const bcrypt = require("bcrypt");

const {handleCallback} = require("$/lib");

const {BCRYPT_SALT} = require("../../../config/secrets");

const UsersModel = require('../../UsersModel');

const getUser = async (username, password, callback = null) =>
    await handleCallback(async () => {
        const passwordHash = bcrypt.hashSync(password, BCRYPT_SALT.USER_PASSWORD);
        return await UsersModel.findOne({
            username: username,
            passwordHash: passwordHash,
        }).lean();
    }, callback);

module.exports = getUser;