
const ComposeWishlistMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `Wishlist game ${mailComposition.textParameters.gameName} is now avaliable [error808]`,
    text: `We have recieved an listing for the game ${mailComposition.textParameters.gameName} you want!`,
  }
}

module.exports = ComposeWishlistMail
