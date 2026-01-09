const express = require("express");

const authRouter = require('./auth')
const userRouter = require('./user')
const listingsRouter = require('./listings')
const wishlistRouter = require('./wishlist')
const router = express.Router();

router.use('/auth',authRouter);
router.use('/user',userRouter);
router.use('/listings',listingsRouter);
router.use('/wishlist',wishlistRouter);

module.exports = router;