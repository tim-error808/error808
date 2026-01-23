
const ComposeDeclinedOfferMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `Your offer was declined [PlayTrade-error808]`,
    text: `Hi there ${mailComposition.textParameters.userName},

Unfortunately, your offer was declined by ${mailComposition.textParameters.declinerName}.

You can still see it in your offer history https://frontend.err808.xyz/profile/history. 

Happy trading and happy gaming,
— error808 team`
  }
}

module.exports = ComposeDeclinedOfferMail
