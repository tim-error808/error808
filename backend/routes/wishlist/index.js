const express = require('express');
const {WishlistController, DeleteFromWishlistController} = require('../../controllers/wishlistController');

const router = express.Router();

router.delete('/:gameId', WishlistController);
router.get('/', DeleteFromWishlistController);

module.exports = router;