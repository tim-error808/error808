const express = require("express");

const authRouter = require('./auth')
const userRouter = require('./user')
const boardGamesRouter = require('./board-games')
const wishlistRouter = require('./wishlist')
const router = express.Router();

router.use('/auth',authRouter);
router.use('/user',userRouter);
router.use('/board-games',boardGamesRouter);
router.use('/wishlist',wishlistRouter);

module.exports = router;