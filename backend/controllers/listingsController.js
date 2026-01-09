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
        if (req.query.search) {
            query.name = {$regex: req.query.search, $options: 'i'};
        }
        let listings = await ListingsModel.aggregate([
            {
                $lookup: {
                    from: "games",
                    localField: "game",
                    "foreignField": "_id",
                    as: "gameDetails"
                }
            },
            {$unwind: "$gameDetails"},
            {$match: {'gameDetails': query}},
        ])

        return res.status(200).json(listings);
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Error fetching listings'});
    }
}

module.exports = listingsController;