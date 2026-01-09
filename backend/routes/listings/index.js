const express = require('express');
const {listingsController, deleteListingController, addListingController} = require("../../controllers/listingsController");
const router = express.Router();
router.get('/', listingsController);
router.delete('/:listingId', deleteListingController);
router.put('/',addListingController);

module.exports = router;