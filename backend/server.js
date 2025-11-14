//require('dotenv').config() // enable for local testing
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const expressSession = require('express-session');
const {secrets: {GOOGLE_AUTH}} = require('./config/');
const authGoogleVerifyController = require('./controllers/auth/google/authGoogleVerifyController');

const {REST_API_PORT, secrets: {MONGODB_URI}} = require('./config');
const originRouter = require('./routes');
const corsOptions = require("./config/corsOptions");
const passport = require("passport");


mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB Connected successfully'))
    .catch(error => {
        console.error(`Error while connecting to MongoDB.`)
        throw error;
    });

const app = express()
    .use(cors(corsOptions))
    .use(express.json())
    .use('/', originRouter);

passport.serializeUser((user, callback) => callback(null, user));
passport.deserializeUser((user, callback) => callback(null, user));
const strategy = new GoogleStrategy({
    clientID: GOOGLE_AUTH.CLIENT_ID,
    clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
    callbackURL: `https://error808-backend-ftcqdmg7fqcsf0gp.westeurope-01.azurewebsites.net/auth/google/callback`,
    scope: ['profile', 'email'],
    state: true,
},authGoogleVerifyController);

app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());


/*server check*/
app.get('/check', (req,res) => {
    res.json({status:'Server is working'});
});

const listenCallback = (error) => {
    if (error) {
        console.log('Error while starting REST API')
        throw error;
    }
    console.log(`REST API started on port ${REST_API_PORT}`);
}

app.listen(REST_API_PORT, listenCallback);
