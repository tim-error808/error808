const express = require('express');
const {listingsController, deleteListingController, addListingController, getUsersListingsController} = require("../../controllers/listingsController");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
router.get('/', listingsController);
router.delete('/remove/:listingId', verifyToken, deleteListingController);
router.put('/new',verifyToken, addListingController);
router.put('/my', verifyToken, getUsersListingsController);

module.exports = router;