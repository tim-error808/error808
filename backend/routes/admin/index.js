const express = require("express");
const adminController = require("../../controllers/adminController");
const verifyToken = require("../../middlewares/verifyToken");
const verifyAdmin = require("../../middlewares/verifyAdmin");

const router = express.Router();

router.use(verifyToken);
router.use(verifyAdmin);

router.route("/users").get(adminController.getAllUsers);
router
  .route("/users/:id")
  .get(adminController.getUserById)
  .put(adminController.updateUserByAdmin)
  .delete(adminController.deleteUser);
router.route("/listings").get(adminController.getAllListings);

router
  .route("/listings/:id")
  .get(adminController.getListingById)
  .put(adminController.updateListingByAdmin)
  .delete(adminController.deleteListing);

module.exports = router;
