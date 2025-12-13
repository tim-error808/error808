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
export const REST_API_PORT = parseInt(process.env.PORT) || 80;
