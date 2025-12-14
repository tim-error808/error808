//TODO: document the function
const userController = (req, res) => {
  /*Note: the reason why mongo is not called here is that because of it 
  the login algorithm stops working on the frontend for some reason
  TODO: determine why that happens*/
  const { email, username, scope } = req.user;

  return res.status(200).json({
    email,
    username,
    scope,
  });
};

module.exports = userController;
