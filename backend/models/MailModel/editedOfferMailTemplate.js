
const ComposeEditedOfferMail = (mailComposition) => {
  return {
    from: mailComposition.from,
    to: mailComposition.to, 
    subject: `edited offer [testing]`,
    text: `edited offer body`
  }
}

module.exports = ComposeEditedOfferMail
