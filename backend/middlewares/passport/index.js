const passport = require('passport');
const {secrets:{GOOGLE_AUTH, JWT_SECRET}} = require("../../config");
const UsersModel = require("../../models/UsersModel");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require("jsonwebtoken");

passport.use(new GoogleStrategy({
    callbackURL: 'https://error808-backend-ftcqdmg7fqcsf0gp.westeurope-01.azurewebsites.net/auth/google/callback',
    clientID: GOOGLE_AUTH.CLIENT_ID,
    clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
    console.log("JWT secret:", JWT_SECRET);
    const token = jwt.sign({email: profile.email}, JWT_SECRET, {expiresIn: '7d'});
    console.log('Creating new user:', profile);
    const newUser = new UsersModel({
        email: profile.email,
        username: profile.email.split('@')[0],
        googleId: profile.id,
        token: token
    })
    newUser.save()
        .catch(err => done(err))
        .then(user => done(null, user));
}),);

passport.serializeUser((user, done) => {
    if(user) return done(null, user);
    return done(null, false);
})

passport.deserializeUser((user, done) => {
    if(user) return done(null, user);
    return done(null, false);
})

module.exports = passport;
