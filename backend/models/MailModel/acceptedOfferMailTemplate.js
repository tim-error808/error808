
const ComposeAcceptedOfferMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `Your offer was accepted [PlayTrade-error808]`,
    text: `Hi there ${mailComposition.textParameters.userName},

Good news! Your offer was accepted by ${mailComposition.textParameters.accepterName} <${mailComposition.textParameters.accepterEmail}>.

You can still see it in your offer history https://frontend.err808.xyz/profile/history. 

Happy trading and happy gaming,
— error808 team`
  }
}

module.exports = ComposeAcceptedOfferMail
