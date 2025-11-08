/**
 * Secret constants that must not be public
 * @module secrets
 */
export const secrets = require('./secrets');

/**
 * Non-Secret constants that can be public
 * @module constants
 */
module.exports = require('./constants');