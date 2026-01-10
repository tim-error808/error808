const {EMAIL_SENDER} = require("../../config/constants");
const mailComposition = {
  mailType: null,
  from: EMAIL_SENDER,
  to: null,
  cc: null,
  bcc: null,
  subject: null,
  textParameters: null,
}

module.exports = mailComposition
