const express = require("express");

const googleRouter = require("./google");
const {loginController, logoutController, refreshController, registerController} = require("../../controllers/auth");

const router = express.Router();

router.use("/google", googleRouter);

router.post("/",loginController);
router.post("/logout",logoutController);
router.post("/refresh",refreshController);
router.post("/register", registerController);

module.exports = router;
