const jwt = require("jsonwebtoken");
const { secrets: { JWT_SECRET, REFRESH_SECRET } } = require("../../../config"); 

const callbackController = (req, res) => {
  const accessToken = jwt.sign(
    { sub: req.user._id },
    JWT_SECRET,
    {expiresIn: "15m"}
  );
  const refreshToken = jwt.sign(
    { sub: req.user._id },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: false, //local
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: false, //local
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.redirect("http://localhost:3000/auth/callback"); //https://proud-smoke-033478b03.3.azurestaticapps.net/auth/callback
}

module.exports = callbackController;