/**
 * Secret constants that must not be public
 * @module secrets
 */

/**
 * URI of a MongoDB database
 * @constant
 * @type {string}
 */
export const MONGODB_URI = process.env.MONGODB_URI;

/**
 * @typedef {Object} BcryptSalt
 * @property {string} OAUTH2_CLIENT_SECRET - salt for OAuth2 client's secret @con
 * @property {string} USER_PASSWORD        - salt for user's password
 */

/**
 * Collection of the Salts used for encryption
 * @type {BcryptSalt}
 */
export const BCRYPT_SALT = {
    OAUTH2_CLIENT_SECRET: process.env.OAUTH2_CLIENT_SECRET_SALT,

    USER_PASSWORD: process.env.USER_PASSWORD_SALT,
}