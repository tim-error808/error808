const express = require('express');
const {deleteUserWishlist, addUserWishlist, getUserWishlist} = require('../../controllers/userController');
const verifyToken = require("../../middlewares/verifyToken");

const router = express.Router();
router.use(verifyToken);
router.delete('/:gameId', deleteUserWishlist);
router.get('/', getUserWishlist);
router.post('/',addUserWishlist);

module.exports = router;