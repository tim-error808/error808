
const ComposeEditedOfferMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `Someone has edited your existing offer [PlayTrade-error808]`,
    text: `Hi there ${mailComposition.textParameters.userName},

${mailComposition.textParameters.requesterName} <${mailComposition.textParameters.requesterEmail}> has edited a trade request with you!

Head over to the site to check out the details, then modify the trade request further or accept it. 

Happy trading and happy gaming,
— error808 team`
  }
}

module.exports = ComposeEditedOfferMail
