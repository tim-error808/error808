const userController = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ status: "NOT AUTHENTICATED" });
  }

  const { _id, email, username, scope } = req.user;

  return res.status(200).json({
    id: _id,
    email,
    username,
    scope,
  });
};

module.exports = userController;
