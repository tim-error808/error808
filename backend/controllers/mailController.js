const nodemailer = require("nodemailer")
const ComposeWishlistMail = require("../models/MailModel/wishlistMailTemplate.js")
const {EMAIL_SENDER, EMAIL_SMTP_HOST, secrets: {EMAIL_PASSWORD}} = require("../config")
const mailComposition = require("../models/MailModel/mailComposition.js")

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
  if(mailComposition.mailType.toLowerCase() === "wishlist") {
    finishedMail = await ComposeWishlistMail(mailComposition)
  }
  
  let info = await transporter.sendMail(finishedMail);
}

module.exports = MailContoller;
