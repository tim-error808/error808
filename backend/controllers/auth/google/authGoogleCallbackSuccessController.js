const jwt = require('jsonwebtoken');
const {secrets: GOOGLE_JWT_SECRET, REST_API_PORT} = require('../../../config');

const authGoogleCallbackSuccessController = async (req, res) => {
    const token = jwt.sign({id: req.user.id},GOOGLE_JWT_SECRET,{expiresIn: "7d"});
    res.redirect(`localhost:${REST_API_PORT}/auth/callback?jwt=${token}`);
}

module.exports = authGoogleCallbackSuccessController;