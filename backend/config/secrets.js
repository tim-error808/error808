/**
 * Secret constants that must not be public
 * @module secrets
 */

/**
 * URI of a MongoDB database
 * @constant
 * @type {string}
 */
const MONGODB_URI = process.env.MONGODB_URI;

const GOOGLE_AUTH = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    MONGODB_URI,
    GOOGLE_AUTH,
    JWT_SECRET,
};