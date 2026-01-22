
const ComposeNewOfferMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `Someone has requested a trade with you! [PlayTrade-error808]`,
    text: `Hi there ${mailComposition.textParameters.userName},

Good news! ${mailComposition.textParameters.requesterName} has requested a trade with you!

Head over to the site to check out the details, then modify the trade request further or accept it.

Make sure you contact ${mailComposition.textParameters.requesterName} <${mailComposition.textParameters.requesterEmail}> to plan out the details.

Happy trading and happy gaming,
— error808 team`
  }
}

module.exports = ComposeNewOfferMail
