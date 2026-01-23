
const ComposeEditOfferMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `Someone has requested a trade with you! [PlayTrade-error808]`,
    text: `Hi there ${mailComposition.textParameters.userName},

${mailComposition.textParameters.requesterName} has edited an offer!

Head over to https://frontend.err808.xyz/offers/my to check out the details.

Make sure you contact ${mailComposition.textParameters.requesterName} <${mailComposition.textParameters.requesterEmail}> to plan out the details.

Happy trading and happy gaming,
— error808 team`
  }
}

module.exports = ComposeEditOfferMail
