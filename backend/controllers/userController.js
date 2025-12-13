const userController = (req, res) => {
  const { email, username, scope } = req.user;

  return res.status(200).json({
    email,
    username,
    scope,
  });
};

module.exports = userController;
