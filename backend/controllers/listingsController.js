const ListingsModel = require("../models/ListingsModel");
const MailController = require("./mailController");
const UsersModel = require("../models/UsersModel");
const mailComposition = require("../models/MailModel/mailComposition");

const listingsController = async (req, res) => {
  try {
    const filters = Array.isArray(req.query.filter)
      ? req.query.filter
      : req.query.filter
      ? [req.query.filter]
      : [];
    const difficultyMap = { easy: 1, medium: 2, hard: 3 };
    const playersMap = {
      2: [2],
      "3-4": [3, 4],
      "4plus": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    };
    const difficulty = filters
      .map((f) => difficultyMap[f])
      .filter((d) => d !== undefined);
    const maxPlayers = filters.flatMap((f) => playersMap[f] || []);
    let query = {};
    if (difficulty.length > 0) {
      query.difficulty = { $in: difficulty };
    }
    if (maxPlayers.length > 0) {
      query.maxPlayers = { $in: maxPlayers };
    }
    const userId = req.user ? req.user._id : "<>";
    let listings = await ListingsModel.find(query).populate("user").lean();
    if (req.query.search) {
      listings = listings.filter((game) =>
        game.name.toLowerCase().includes(req.query.search.toLowerCase())
      );
    }
    return res.status(200).json(listings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching listings" });
  }
};

const listingDetailsController = async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await ListingsModel.findById(listingId)
      .populate("user")
      .lean();
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    return res.status(200).json(listing);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching listing details" });
  }
};

const addListingController = async (req, res) => {
  try {
    const userId = req.user._id;

    await ListingsModel.create({
      user: userId,

      name: req.body.name,
      genre: req.body.genre,
      publisher: req.body.publisher,
      condition: req.body.condition,
      description: req.body.description,

      releaseYear: Number(req.body.releaseYear),
      minPlayers: Number(req.body.minPlayers),
      maxPlayers: Number(req.body.maxPlayers),
      playTime: Number(req.body.playTime),
      difficulty: Number(req.body.difficulty),

      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    const users = await UsersModel.find({
      wishlist: { $in: [req.body.name] },
    }).lean();

    for (const user of users) {
      try {
        const composition = {
          ...mailComposition,
          to: user.email,
          mailType: "wishlist",
          textParameters: {
            userName: user.username,
            gameName: req.body.name,
          },
        };

        await MailController(composition);
      } catch (err) {
        console.error(`Error sending wishlist email to ${user.email}:`, err);
      }
    }

    return res.status(201).json({
      message: "Listing added successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Error adding listing" });
  }
};

const deleteListingController = async (req, res) => {
  try {
    const listingId = req.params.listingId;
    await ListingsModel.deleteOne({ _id: listingId });
    return res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting listing" });
  }
};

const getUsersListingsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const listings = await ListingsModel.find({ user: userId });
    return res.status(200).json(listings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching user's listings" });
  }
};

module.exports = {
  listingsController,
  addListingController,
  deleteListingController,
  getUsersListingsController,
  listingDetailsController,
};
