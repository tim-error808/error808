const UsersModel = require("../../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  LOCAL_TEST,
  secrets: { JWT_SECRET, REFRESH_SECRET },
} = require("../../config");

const loginController = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await UsersModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  }).exec();

  if (!foundUser || !foundUser.isActive) {
    return res.status(401).json({ message: "User Not Found!" });
  }

  const match = await bcrypt.compare(password, foundUser.passwordHash);

  if (!match) return res.status(401).json({ message: "Wrong Password!" });

  const accessToken = jwt.sign({ sub: foundUser._id }, JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ sub: foundUser._id }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: !LOCAL_TEST,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: !LOCAL_TEST,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Login successful!" });
};

module.exports = loginController;
