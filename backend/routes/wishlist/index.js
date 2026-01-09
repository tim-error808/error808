const express = require('express');
const {WishlistController, DeleteFromWishlistController,AddToWishlistController} = require('../../controllers/wishlistController');

const router = express.Router();

router.delete('/:gameId', WishlistController);
router.get('/', DeleteFromWishlistController);
router.put('/',AddToWishlistController);

module.exports = router;