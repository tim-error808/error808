const jwt = require('jsonwebtoken');
const {secrets: GOOGLE_JWT_SECRET, REST_API_PORT} = require('../../../config');

const authGoogleCallbackSuccessController = async (req, res) => {
    const token = jwt.sign({id: req.user.id},GOOGLE_JWT_SECRET,{expiresIn: "7d"});
    res.redirect(`https://proud-smoke-033478b03.3.azurestaticapps.net/auth/callback?jwt=${token}`);
}

module.exports = authGoogleCallbackSuccessController;
