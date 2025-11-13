/**
 * Non-Secret constants that can be public
 * @module constants
 */

/**
 * Port used by the REST API
 *
 * @constant REST_API_PORT
 *
 * @default 23451
 *
 * @type {int}
 */
export const REST_API_PORT = parseInt(process.env.REST_API_PORT) || 23451;

/**
 * Port used by the Frontend
 * @constant FRONTED_PORT
 *
 * @default 443
 *
 * @type {int}
 */
export const FRONTED_PORT = parseInt(process.env.FRONTED_PORT) || 443;

/**
 * List of valid scopes in the OAuth2 Authentication Server
 *
 * @constant OAUTH2_VALID_SCOPES
 *
 * @type {string[]}
 */
const OAUTH2_VALID_SCOPES = ["sample_scope1","sample_scope2","sample_scope3"];

/**
 * 1 if OAuth2 Authentication Server should accept partially valid scopes
 *
 * @constant OAUTH2_ACCEPT_PARTIALLY_VALID_SCOPES
 *
 * @type {string|number}
 */
const OAUTH2_ACCEPT_PARTIALLY_VALID_SCOPES = parseInt(process.env.ACCEPT_PARCIALLY_VALID_SCOPES) || 0;
