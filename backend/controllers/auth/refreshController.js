const {secrets: JWT_SECRET} = require('../../config')

const refreshController = async (req, res) => {
  const token = req.cookies.refresh_token;
  if (!token) {
    return res.status(403).json({ message: "No refresh token" });
  }
  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { sub: payload.sub },
      JWT_SECRET,
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
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

module.exports = refreshController