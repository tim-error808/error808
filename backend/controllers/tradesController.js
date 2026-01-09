const TradesModel = require('../models/TradesModel');

const recievedTradesController = (req, res) => {
    const userId = req.user._id;
    const trades = TradesModel.find({recipient: userId,status: 'active'})
        .populate('offeredListings').populate('requestedListings');
    return res.status(200).json(trades);
}

const newTradeController = async (req, res) => {
    try {
        const userId = req.user._id;
        const {requestedListings, offeredListings, message} = req.body;
        const _ = await TradesModel.create({
            requester: userId,
            recipient: req.body.recipient,
            requestedListings,
            offeredListings,
            message,
            status: 'active'
        });
        return res.status(200).json({message: 'Trade request sent successfully'});
    } catch (err) {
        console.error(err);
        return  res.status(500).json({message: 'Error creating trade request'});
    }
}

module.exports = {
    recievedTradesController,
    newTradeController,
}