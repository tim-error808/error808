const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  //TODO: implement login logic
};

const register = async (req, res) => {
  //TODO: implement register logic
};

const refresh = async (req, res) => {
  const token = req.cookies.refresh_token;
  if (!token) {
    console.log("here");
    return res.status(401).json({ message: "No refresh token" });
  }
  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { sub: payload.sub },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: false, // local
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Access token refreshed" });
  } catch (err) {
    res.json({ message: "Invalid refresh token" });
  }
};

const logout = async (req, res) => {
  res.cookie("access_token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
  });
  res.cookie("refresh_token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { login, register, refresh, logout };
