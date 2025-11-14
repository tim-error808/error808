const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const {REST_API_PORT, secrets: {GOOGLE_AUTH}} = require("../../../config/");
const authGoogleVerifyController = require("../../../controllers/auth/google/authGoogleVerifyController");

const googlePassportInit = () =>{
}

module.exports = googlePassportInit;
