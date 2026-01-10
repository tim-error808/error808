const nodemailer = require("nodemailer")
const ComposeWishlistMail = require("../models/MailModel/wishlistMailTemplate.js")
const mailComposition = require("../models/MailModel/mailComposition.js")

const MailContoller = async (mailComposition) => {

  console.log(mailComposition)
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "tabitha99@ethereal.email", // generated ethereal user
      pass: "S29gqSNMdXJ42GUnGA", // generated ethereal password
    },
  });
  
  let finishedMail = null
  if(mailComposition.mailType.toLowerCase() === "wishlist") {
    finishedMail = await ComposeWishlistMail(mailComposition)
  }
  
  let info = await transporter.sendMail(finishedMail);
}

module.exports = MailContoller;
