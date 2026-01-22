
const ComposeDeclinedOfferMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `declined offer [testing]`,
    text: `declined offer body`
  }
}

module.exports = ComposeDeclinedOfferMail
