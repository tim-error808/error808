const nodemailer = require("nodemailer")
const ComposeWishlistMail = require("../models/MailModel/wishlistMailTemplate.js")
const {EMAIL_SENDER, EMAIL_SMTP_HOST, secrets: {EMAIL_PASSWORD}} = require("../config")
const mailComposition = require("../models/MailModel/mailComposition.js")
const ComposeAcceptedOfferMail = require("../models/MailModel/acceptedOfferMailTemplate.js")
//const ComposeEditedOfferMail = require("../models/MailModel/editedOfferMailTemplate.js")
const ComposeDeclinedOfferMail = require("../models/MailModel/declinedOfferMailTemplate.js")
const ComposeNewOfferMail = require("../models/MailModel/newOfferMailTemplate.js")
const ComposeDeletedListingMail = require("../models/MailModel/deletedListingMailTemplate.js")

const MailContoller = async (mailComposition) => {

  let transporter = nodemailer.createTransport({
    host: EMAIL_SMTP_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL_SENDER, // generated ethereal user
      pass: EMAIL_PASSWORD, // generated ethereal password
    },
  });
  
  let finishedMail = null
  switch(mailComposition.mailType.toLowerCase()){
    case "wishlist": 
      finishedMail = await ComposeWishlistMail(mailComposition);
      break;
    case "acceptedoffer":
      finishedMail = await ComposeAcceptedOfferMail(mailComposition);
      break;
    case "declinedoffer":
      finishedMail = await ComposeDeclinedOfferMail(mailComposition);
      break;
    case "deletedoffer":
      finishedMail = await ComposeDeletedListingMail(mailComposition);
    case "newoffer":
      finishedMail = await ComposeNewOfferMail(mailComposition);
      break;
    case "deletedlisting":
      finishedMail = await ComposeNewOffer
  }

  
  let info = await transporter.sendMail(finishedMail);
}

module.exports = MailContoller;
