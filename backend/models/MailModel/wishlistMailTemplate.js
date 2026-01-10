
const ComposeWishlistMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: "Wishlist game avaliable [error808]", //TODO add generic subject for wishlist
    text: "We have recieved an listing for the game you want!", // TODO add generic template text mailComposition.textParameters
  }
}

module.exports = ComposeWishlistMail
