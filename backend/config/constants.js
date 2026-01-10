/**
 * Non-Secret constants that can be public
 * @module constants
 */

/**
 * Port used by the REST API
 *
 * @constant PORT
 *
 * @default 23451
 *
 * @type {int}
 */
const REST_API_PORT = parseInt(process.env.PORT) || 80;

const LOCAL_TEST = process.env.LOCAL_TEST!=='0' || false;

const FRONTEND_URL = process.env.FRONTEND_URL || "<invalid>";

const EMAIL_SENDER = process.env.EMAIL_SENDER || "tabitha99@ethereal.email";

const EMAIL_SMTP_HOST = process.env.EMAIL_SMTP_HOST || "smtp.ethereal.email";

module.exports = {
    REST_API_PORT, 
    LOCAL_TEST,
    FRONTEND_URL,
    EMAIL_SENDER,
    EMAIL_SMTP_HOST
};
