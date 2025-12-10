/*const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/secrets");
const UsersModel = require("../models/UsersModel");*/

const userController = async (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ status: "NOT AUTHENTICATED" });
  }
  return res.status(200).json(req.user);
};

module.exports = userController;

/*const userController = async (req, res) => {
  let googleId;
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: "ACCESS TOKEN MISSING" });
    }
    googleId = await jwt.verify(token, JWT_SECRET).googleId;
  } catch (err) {
    return res.status(500).json({ status: "TOKEN ERROR" });
  }
  const user = await UsersModel.findOne({ googleId: googleId }).lean();
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(401).json({ status: "NO USER" });
};

module.exports = userController;*/
