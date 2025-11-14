const express = require("express");

const authRouter = require('./auth')
const userRouter = require('./user')
const boardGamesRouter = require('./board-games')
const router = express.Router();

router.use('/auth',authRouter);
router.use('/user',userRouter);
router.use('/board-games',boardGamesRouter);

module.exports = router;