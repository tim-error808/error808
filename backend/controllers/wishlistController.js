const WishlistModel = require('../models/WishlistModel');

const WishlistController = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            throw "Missing user Id";
        }
        const wishlist = await WishlistModel.findOne({userId})
            .populate('games').lean().exec();
        if (!wishlist) {
            return res.status(200).json(wishlist.games);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Server error'});
    }
}

const DeleteFromWishlistController = async (req, res) => {
    try{
        const userId = req.user._id;
        const gameId = req.gameId;

        if (!userId || !gameId) {
            throw "Missing userId or gameId";
        }
        const _ = await WishlistModel.updateOne(
            { userId: userId },
            { $pull: { games: gameId } }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Server error'});
    }
}

const AddToWishlistController = async (req, res) => {
    try{
        const userId = req.user._id;
        const gameId = req.gameId;

        if (!userId || !gameId) {
            throw "Missing userId or gameId";
        }
        const _ = await WishlistModel.updateOne(
            { userId: userId },
            { $push: { games: gameId } }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Server error'});
    }
}

module.exports = {
    WishlistController,
    DeleteFromWishlistController,
    AddToWishlistController
}