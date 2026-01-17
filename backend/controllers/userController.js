//TODO: document the function
const UsersModel = require("../models/UsersModel");

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

    return res.status(200).json(userData);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getUserWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = await UsersModel.findOne({ _id: userId }, "wishlist")
      .lean()
      .exec();
  } catch (err) {
    return res.status(500).json({ message: "Error getting a wishlist" });
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

const deleteUserWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { gameName } = req.params;
    const _ = await UsersModel.updateOne(
      { _id: userId },
      { $pull: { wishlist: gameName } }
    );
    return res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error deleting from wishlist" });
  }
};

const addUserWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { gameName } = req.body;
    const _ = await UsersModel.updateOne(
      { _id: userId },
      { $addToSet: { wishlist: gameName } }
    );
    return res.status(200).json({ message: "Added to wishlist" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error adding to wishlist" });
  }
};

module.exports = {
  getUserData,
  updateUserData,
  deleteUserWishlist,
  addUserWishlist,
  getUserWishlist,
};
