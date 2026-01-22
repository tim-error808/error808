
const ComposeAcceptedOfferMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `new offer [testing]`,
    text: `new offer body`
  }
}

module.exports = ComposeAcceptedOfferMail
