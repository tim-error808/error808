const express = require('express');
const {deleteUserWishlist, addUserWishlist, getUserWishlist} = require('../../controllers/userController');

const router = express.Router();

router.delete('/:gameId', deleteUserWishlist);
router.get('/', getUserWishlist);
router.post('/',addUserWishlist);

module.exports = router;