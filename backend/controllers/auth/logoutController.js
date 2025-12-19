const { LOCAL_TEST } = require("../../config");

const logoutController = async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: !LOCAL_TEST,
    sameSite: "strict",
  });
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: !LOCAL_TEST,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = logoutController;
