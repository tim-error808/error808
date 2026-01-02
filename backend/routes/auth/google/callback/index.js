const express = require("express");
const passport = require("passport");

const {callbackController} = require("../../../../controllers/auth/google");
const { LOCAL_TEST, FRONTEND_URL } = require("../../../../config");

const router = express.Router();

router.get("/",
    passport.authenticate("google", {
        failureRedirect: LOCAL_TEST?"http://localhost:3000/auth/login":`${FRONTEND_URL}/auth/login`,
        session: false,
    }),
    callbackController
);
module.exports = router;
