
const ComposeDeletedOfferMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `deleted offer [testing]`,
    text: `deleted offer body`
  }
}

module.exports = ComposeDeletedOfferMail
