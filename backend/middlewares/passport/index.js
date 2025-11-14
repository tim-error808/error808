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
    const token = jwt.sign({googleId: profile.id}, JWT_SECRET, {expiresIn: '7d'});

    UsersModel.findOne({googleId: profile.id})
        .then(user => {
            if(!user) {
                const newUser = new UsersModel({
                    email: profile.emails[0].value,
                    username: profile.emails[0].value.split('@')[0],
                    scope: ['user'],
                    googleId: profile.id,
                    token: token
                });
                newUser.save()
                    .catch(err => done(err))
                    .then(user => done(null, user));
            } else{
                console.log("Existing user logged in: ")
                UsersModel.updateOne({googleId: profile.id}, {$set: {token: token}})
                    .catch(err => done(err))
                    .then(res =>
                        UsersModel.findOne({googleId: profile.id})
                            .then(user => done(null, user))
                            .catch(err => done(err))
                    );
            }
        })
        .catch(err => done(err));
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
