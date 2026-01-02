//TODO: document the function
const UsersModel = require("../models/UsersModel");
const WishlistModel = require("../models/WishlistModel");

//@desc dohvati podatke o ulogiranom useru
//@method GET /user

const getUserData = async (req, res) => {
  try {
    const { email, username } = req.user;
    const userData = await UsersModel.findOne({
      $or: [{ email }, { username }],
    })
      .select("-_id -passwordHash")
      .lean()
      .exec();

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const wishlistData = await WishlistModel.findOne({ userId: userData._id })
      .populate("games")
      .lean()
      .exec();

    const userWithWishlist = {
      ...userData,
      wishlist: wishlistData ? wishlistData.games : [],
      notificationsEnabled: wishlistData
        ? wishlistData.notificationsEnabled
        : false,
    };

    return res.status(200).json(userWithWishlist);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

//@desc azuriraj podatke ulogiranog usera
//@method PUT /user

const updateUserData = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, description, interests, location } = req.body;

    const updateData = {};

    if (username) updateData.username = username;

    if (description !== undefined) {
      updateData["profile.description"] = description;
    }

    if (interests) {
      updateData["profile.interests"] = JSON.parse(interests);
    }

    if (location) {
      updateData.location = JSON.parse(location);
    }

    if (req.file) {
      updateData["profile.photoUrl"] = `/uploads/${req.file.filename}`;
    }

    await UsersModel.findByIdAndUpdate(userId, updateData).select(
      "-passwordHash"
    );

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating profile" });
  }
};

module.exports = { getUserData, updateUserData };
