
const ComposeDeletedOfferMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `Your offer was deleted [PlayTrade-error808]`,
    text: `Hi there ${mailComposition.textParameters.userName},

Unfortunately, one of your offers was deleted. 

You can still see it in your offer history. 

Happy trading and happy gaming,
— error808 team`
  }
}

module.exports = ComposeDeletedOfferMail
