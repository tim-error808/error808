
const ComposeDeletedOfferMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `Your offer was deleted [PlayTrade-error808]`,
    text: `Hi there ${mailComposition.textParameters.userName},

Unfortunately, one of your offers was deleted. This is either due to the games allready being present in another accepted offer or due to our administation team deciding to delete your offer.

You can still see it in your offer history. 

Happy trading and happy gaming,
— error808 team`
  }
}

module.exports = ComposeDeletedOfferMail
