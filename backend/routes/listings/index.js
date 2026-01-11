const express = require("express");
const {
  listingsController,
  deleteListingController,
  addListingController,
  getUsersListingsController,
  listingDetailsController,
} = require("../../controllers/listingsController");
const verifyToken = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/upload");
const router = express.Router();
router.get("/", listingsController);
router.get("/details/:listingId", listingDetailsController);
router.delete("/remove/:listingId", verifyToken, deleteListingController);
router.post("/new", verifyToken, upload.single("image"), addListingController);
router.get("/my", verifyToken, getUsersListingsController);

module.exports = router;
