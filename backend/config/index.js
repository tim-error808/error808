/**
 * Secret constants that must not be public
 * @module secrets
 */
const secrets = require('./secrets');

/**
 * Non-Secret constants that can be public
 * @module constants
 */
const constants = require('./constants');

module.exports = {
  ...constants,
  secrets
};
