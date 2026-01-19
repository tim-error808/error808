const UsersModel = require("../models/UsersModel");
const ListingsModel = require("../models/ListingsModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await UsersModel.find().select(" -passwordHash").lean();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UsersModel.findById(req.params.id).select("-passwordHash").lean();
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await UsersModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: " Korisnik izbrisan" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserByAdmin = async (req, res) => {
  try {
    const { username, email, scope, isActive } = req.body;
    const updateData = {};

    if (username !== undefined) 
        updateData.username = username;
    if (email !== undefined) 
        updateData.email = email;
    if (scope !== undefined) 
        updateData.scope = scope;
    if (isActive !== undefined) 
        updateData.isActive = isActive;

    const updatedUser = await UsersModel.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-passwordHash").lean();
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error " });
  }
};

const getAllListings = async (req, res) => {
  try {
    const listings = await ListingsModel.find().lean();
    res.status(200).json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await ListingsModel.findById(req.params.id).lean();
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteListing = async (req, res) => {
  try {
    await ListingsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Objava izbrisana" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateListingByAdmin = async (req, res) => {
  try {
    const updateData = req.body; // očekuje se JSON s poljima za update
    const updatedListing = await ListingsModel.findByIdAndUpdate(req.params.id, updateData, { new: true }).lean();
    if (!updatedListing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(updatedListing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserByAdmin,
  getAllListings,
  getListingById,
  deleteListing,
  updateListingByAdmin
};
