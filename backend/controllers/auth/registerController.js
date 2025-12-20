const UsersModel = require("../../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  LOCAL_TEST,
  secrets: { JWT_SECRET, REFRESH_SECRET },
} = require("../../config");

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await UsersModel.findOne({
    $or: [{ email }, { username }],
  }).exec();

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "Username or email already in use" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await UsersModel.create({
    username,
    email,
    passwordHash,
    scope: "user",
    isActive: true,
  });

  const accessToken = jwt.sign({ sub: newUser._id }, JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ sub: newUser._id }, REFRESH_SECRET, {
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

  res.status(201).json({ message: "Registration successful!" });
};

module.exports = registerController;
