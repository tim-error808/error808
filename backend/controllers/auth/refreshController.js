const {
  LOCAL_TEST,
  secrets: { JWT_SECRET, REFRESH_SECRET },
} = require("../../config");

const refreshController = async (req, res) => {
  const token = req.cookies.refresh_token;
  if (!token) {
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
    return res.status(403).json({ message: "No refresh token" });
  }
  try {
    const payload = jwt.verify(token, REFRESH_SECRET);
    const newAccessToken = jwt.sign({ sub: payload.sub }, JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: !LOCAL_TEST,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Access token refreshed" });
  } catch (err) {
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
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

module.exports = refreshController;
