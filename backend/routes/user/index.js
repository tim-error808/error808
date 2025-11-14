const express = require('express');
const jwt = require('jsonwebtoken');
const UsersModel = require("../../models/UsersModel");
const {secrets: {JWT_SECRET}} = require("../../config");

const router = express.Router();

router.get('/', async (req, res) => {
    let googleId;
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({status: 'ACCESS TOKEN MISSING'});
        }
        googleId = await jwt.verify(token, JWT_SECRET).googleId;
    } catch (err) {
        return res.status(500).json({status: 'TOKEN ERROR'});
    }
    const user = await UsersModel.findOne({googleId:googleId}).lean();
    if (user) {
        return res.status(200).json(user);
    }
    return res.status(401).json({status: 'NO USER'});
});

module.exports=router;