
const ComposeDeletedOfferMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `Your game was removed from our app [PlayTrade-error808]`,
    text: `Hi there ${mailComposition.textParameters.userName},

Unfortunately, one of your games was deleted.

Happy trading and happy gaming,
— error808 team`
  }
}

module.exports = ComposeDeletedOfferMail
