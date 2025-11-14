const UsersModel = require("../../../models/UsersModel");

const authGoogleVerifyController = (request, accessToken, refreshToken, profile, callback) => {
    const userEmail = profile.email;
    const userGoogleId = profile.id;
    let user;
    UsersModel.findOne({googleId: userGoogleId}).lean()
        .then(newUser => user=newUser)
        .catch(err => callback(err));
    if (!user) {
        const newUser = {
            username: userEmail.split("@")[0],
            googleId: userGoogleId,
            email: userEmail,
            scope: "user",
            passwordHash: "<google-authenticated>"
        };
        return UsersModel.create(newUser)
            .then(newUser => callback(null,newUser))
            .catch(err => callback(err));
    }
    return callback(null, user);
}

module.exports = authGoogleVerifyController