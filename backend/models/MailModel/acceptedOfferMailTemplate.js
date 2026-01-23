
const ComposeAcceptedOfferMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `new offer [testing]`,
    text: `Hi there ${mailComposition.textParameters.userName},

Good news! Your offer was accepted by ${mailComposition.textParameters.accepterName} <${mailComposition.textParameters.accepterEmail}>.

You can still see it in your offer history. 

Happy trading and happy gaming,
— error808 team`
  }
}

module.exports = ComposeAcceptedOfferMail
