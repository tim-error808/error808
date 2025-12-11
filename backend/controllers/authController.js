const UsersModel = require("../models/UsersModel");

const login = async (req, res) => {
  //TODO: implement login logic
};

const register = async (req, res) => {
  //TODO: implement register logic
};

const logout = async (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { login, register, logout };
