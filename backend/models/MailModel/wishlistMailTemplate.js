
const ComposeWishlistMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `A board game from your wishlist is now available! [PlayTrade-error808]`,
    text: `Hi there ${mailComposition.textParameters.userName},

Good news! A board game on your wishlist has just become available on our marketplace. Since you marked it as a favorite, we wanted to let you know as soon as it showed up.

${mailComposition.textParameters.gameName} is the game in question!

Head over to the site to check out the details and see if it’s the right fit for your collection.

Happy trading and happy gaming,
— error808 team`
  }
}

module.exports = ComposeWishlistMail
