const jwt = require("jsonwebtoken");
const {
  LOCAL_TEST,
  FRONTEND_URL,
  secrets: { JWT_SECRET, REFRESH_SECRET },
} = require("../../../config");

const callbackController = (req, res) => {
  const accessToken = jwt.sign({ sub: req.user._id }, JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ sub: req.user._id }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: !LOCAL_TEST,
    sameSite: "none",
    maxAge: 15 * 60 * 1000,
    domain: LOCAL_TEST?undefined:".error808.tech"
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: !LOCAL_TEST,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: LOCAL_TEST?undefined:".error808.tech"
  });

  if (LOCAL_TEST) {
    res.redirect(`http://localhost:3000/auth/callback`);
  } else {
    res.redirect(`${FRONTEND_URL}/auth/callback`);
  }
};

module.exports = callbackController;
