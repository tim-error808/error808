const express = require("express");
const {
  listingsController,
  deleteListingController,
  addListingController,
  getUsersListingsController,
  listingDetailsController,
  editListingController,
} = require("../../controllers/listingsController");
const verifyToken = require("../../middlewares/verifyToken");
const verifyTokenIfLoggedIn = require("../../middlewares/verifyTokenIfLoggedIn");
const upload = require("../../middlewares/upload");
const router = express.Router();
router.get("/", verifyTokenIfLoggedIn, listingsController);
router.get(
  "/details/:listingId",
  verifyTokenIfLoggedIn,
  listingDetailsController
);
router.delete("/remove/:listingId", verifyToken, deleteListingController);
router.put(
  "/edit/:listingId",
  verifyToken,
  upload.single("image"),
  editListingController
);
router.post(
  "/new",
  verifyToken,
  upload.single("imageUrl"),
  addListingController
);
router.get("/my", verifyToken, getUsersListingsController);

module.exports = router;
