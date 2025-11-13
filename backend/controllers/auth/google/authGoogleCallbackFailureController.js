const {REST_API_PORT} = require("../../../config");

const googleAuthCallbackFailureController = (req, res) => {
    res.redirect(`localhost:${REST_API_PORT}/auth/callback`);
}

module.exports = googleAuthCallbackFailureController;