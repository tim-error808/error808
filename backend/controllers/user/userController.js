const UsersModel = require("../../models/UsersModel");

const userController = async (req, res) => {
    const user = await UsersModel.findOne({googleId: req.userGoogleId}).lean();
    if (!user) {
        return res.status(401).send({error: "NO USER"});
    }
    return res.status(200).json(user);
}

module.exports = userController;