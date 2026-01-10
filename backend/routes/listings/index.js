const express = require('express');
const {listingsController, deleteListingController, addListingController, getUsersListingsController} = require("../../controllers/listingsController");
const verifyToken = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/upload");
const router = express.Router();
router.get('/', listingsController);
router.delete('/remove/:listingId', verifyToken, deleteListingController);
router.put('/new',verifyToken, upload.single("photo"), addListingController);
router.put('/my', verifyToken, getUsersListingsController);

module.exports = router;