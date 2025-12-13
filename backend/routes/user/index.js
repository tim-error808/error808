const express = require("express");
const userController = require("../../controllers/userController");
const verifyToken = require("../../middlewares/verifyToken");

const router = express.Router();

router.get("/", verifyToken, userController);

module.exports = router;
