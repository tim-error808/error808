const ListingsModel = require("../models/ListingsModel");

const listingsController = async (req, res) => {
    try {
        console.log("board game query: ", req.query);
        const filters = Array.isArray(req.query.filter)
            ? req.query.filter
            : req.query.filter
                ? [req.query.filter]
                : [];
        const difficultyMap = {easy: 1, medium: 2, hard: 3};
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
            query.difficulty = {$in: difficulty};
        }
        if (maxPlayers.length > 0) {
            query.maxPlayers = {$in: maxPlayers};
        }
        const userId = req.user ? req.user._id : "<>";
        let listings = await ListingsModel.find(query).lean();
        if (req.query.search) {
            listings = listings.filter((game) =>
                game.name.toLowerCase().includes(req.query.search.toLowerCase())
            );
        }
        return res.status(200).json(listings);
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Error fetching listings'});
    }
}

const addListingController = async (req, res) => {
    try {
        const userId = req.user._id;
        const _ = await ListingsModel.create({
            ...req.body,
            user: userId,
        })
        return res.status(200).json({message: 'Listing added successfully'});
    }catch (err){
        console.error(err);
        return res.status(500).json({message: 'Error adding listing'});
    }
}

const deleteListingController = async (req, res) => {
    try {
        const listingId = req.params.listingId;
        const listing = await ListingsModel.deleteOne({_id: listingId});
        return res.status(200).json({message: 'Listing deleted successfully'});
    }catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Error deleting listing'});
    }
}

const getUsersListingsController = async (req, res) => {
    try {
        const userId = req.user._id;
        const listings = await ListingsModel.find({user: userId});
        return res.status(200).json(listings);
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Error fetching user\'s listings'});
    }
}

module.exports = {listingsController,addListingController, deleteListingController, getUsersListingsController};