const express = require('express');
const userController = require("../../controllers/userController");
const {secrets: {JWT_SECRET}} = require("../../config");

const router = express.Router();

router.get('/', userController);

module.exports=router;