const UsersModel = require("../../../models/UsersModel");

const authGoogleVerifyController = async (request, accessToken, refreshToken, profile, callback) => {
    try {
        const userEmail = profile.emails?.[0]?.value || profile.email;
        const userGoogleId = profile.id;
        let user;
        user = await UsersModel.findOne({googleId: userGoogleId}).lean()
        if (!user) {
            const newUser = {
                username: userEmail.split("@")[0],
                googleId: userGoogleId,
                email: userEmail,
                scope: "user",
                passwordHash: "<google-authenticated>"
            };
            const newUserData = await UsersModel.create(newUser);
            return callback(null, newUserData);
        }
        return callback(null, user);
    } catch (error) {
        return callback(error);
    }
}

module.exports = authGoogleVerifyController