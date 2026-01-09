const express = require('express');
const {listingsController, deleteListingController, addListingController, getUsersListingsController} = require("../../controllers/listingsController");
const router = express.Router();
router.get('/', listingsController);
router.delete('/remove:listingId', deleteListingController);
router.put('/new',addListingController);
router.put('/my', getUsersListingsController);

module.exports = router;