const {REST_API_PORT} = require("../../../config");

const googleAuthCallbackFailureController = (req, res) => {
    res.redirect(`https://proud-smoke-033478b03.3.azurestaticapps.net/auth/callback`);
}

module.exports = googleAuthCallbackFailureController;
