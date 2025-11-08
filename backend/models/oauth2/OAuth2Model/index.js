/**
 * @module OAuth2Model
 * A Model that implements a specification described in
 * https://oauth2-server.readthedocs.io/en/latest/model/spec.html#verifyscope-accesstoken-scope-callback.
 *
 * This Model's documentation contains most of the original specification's documentation with some modifications.
 *
 * Each model function supports promises, Node-style callbacks, ES6 generators and
 *  async/await (using Babel).
 * Note that promise support implies support for returning plain values where asynchronism is not required.
 *
 */

/**
 * Method based on the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getaccesstoken-accesstoken-callback|getAccessToken}
 *
 * Invoked to retrieve an existing access token previously saved through {@link saveToken}.
 *
 * This model function is **required** if {@link OAuthServer#authenticate} is used.
 *
 * **Invoked during:**
 *  - request authentication
 *
 * @function getAccessToken
 *
 * @param {string} accessToken   - The access token to retrieve.
 *
 * @param {?function(Error,OAuth2AccessToken):callbackReturnType} callback=null -  Node-style callback to be used
 *                                                                                 instead of the returned
 *                                                                                 {@link Promise}.
 *
 * @returns {Promise<?OAuth2AccessToken>|callbackReturnType} - An {@link Object} representing the access token
 *                                                                      and associated data.
 *
 * @template callbackReturnType
 */
export const getAccessToken = require("./getAccessToken");

/**
 * Method based on the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getauthorizationcode-authorizationcode-callback|getAuthorizationCode}
 *
 * Invoked to retrieve an existing authorization code previously saved through {@link saveAuthorizationCode}.
 *
 * This model function is **required** if the `authorization_code` grant is used.
 *
 * **Invoked during:**
 *  - `authorization_code` grant
 *
 * @function getAuthorizationCode
 *
 * @param {string} authorizationCode - The authorization code to retrieve.
 *
 * @param {?function(Error,OAuth2AccessToken):callbackReturnType} callback=null -  Node-style callback to be used
 *                                                                                 instead of the returned
 *                                                                                 {@link Promise}.
 *
 * @returns {Promise<?OAuth2AuthorizationCode>| callbackReturnType} - An {@link Object} representing the
 *                                                                             authorization code and associated data.
 *
 * @template callbackReturnType
 */
export const getAuthorizationCode = require("./getAuthorizationCode")

/**
 * Method based on the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getclient-clientid-clientsecret-callback|getClient}
 *
 * Invoked to retrieve a client using a client id or a client id/client secret combination, depending on the grant type.
 *
 * This model function is **required** for all grant types.
 *
 * **Invoked during:**
 *  - `authorization_code` grant
 *  - `client_credentials` grant
 *  - `implicit` grant
 *  - `refresh_token` grant
 *  - `password` grant
 *
 * @function getClient
 *
 * @param {string}  clientId     - The client id of the client to retrieve.
 * @param {?string} clientSecret - The client secret of the client to retrieve. Can be `null` _but in our implementation
 *                                 that returns `undefined`_.
 *
 * @param {?function(Error,OAuth2AccessToken):callbackReturnType} callback=null -  Node-style callback to be used
 *                                                                                 instead of the returned
 *                                                                                 {@link Promise}.
 *
 * @returns {Promise<?OAuth2Client|undefined>|callbackReturnType} - An {@link Object} representing the client and
 *                                                                 associated data, or a falsy value if no such client
 *                                                                 could be found.
 *
 * @template callbackReturnType
 */
export const getClient = require("./getClient");

/**
 * Method based on the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getrefreshtoken-refreshtoken-callback|getRefreshToken}
 *
 * Invoked to retrieve an existing refresh token previously saved through {@link saveToken}.
 *
 * This model function is **required** if the `refresh_token` grant is used.
 *
 * **Invoked during:**
 *  - `refresh_token` grant
 *
 * @function getRefreshToken
 *
 * @param {string} refreshToken - The access token to retrieve.
 *
 * @param {?function(Error,OAuth2AccessToken):callbackReturnType} callback=null -  Node-style callback to be used
 *                                                                                 instead of the returned
 *                                                                                 {@link Promise}.
 *
 * @returns {Promise<?OAuth2RefreshToken>|callbackReturnType} - An {@link Object} representing the refresh
 *                                                                       token and associated data.
 *
 * @template callbackReturnType
 */
export const getRefreshToken = require("./getRefreshToken");

/**
 * Method based on the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getuser-username-password-callback|getUser}
 *
 * Invoked to retrieve a user using a username/password combination.
 *
 * This model function is **required** if the `password` grant is used.
 *
 * **Invoked during:**
 *  - `password` grant
 *
 * @function getUser
 *
 * @param {string} username - The username of the user to retrieve.
 * @param {string} password - The user’s password.
 *
 * @param {?function(Error,OAuth2AccessToken):callbackReturnType} callback=null -  Node-style callback to be used
 *                                                                                 instead of the returned
 *                                                                                 {@link Promise}.
 *
 * @returns {Promise<User>|callbackReturnType} - An Object representing the user, or a falsy value if no such
 *                                               user could be found. The user object is completely transparent
 *                                               to `oauth2-server` and is simply used as input to other model functions.
 *
 * @template callbackReturnType
 */
export const getUser = require("./getUser");

/**
 * Method based on the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getuserfromclient-client-callback|getUserFromClient}
 *
 * Invoked to retrieve the user associated with the specified client.
 *
 * This model function is **required** if the `client_credentials` grant is used.
 *
 * **Invoked during:**
 *  - `client_credentials` grant
 *
 * @function getUserFromClient
 *
 * @param {OAuth2Client} client - The client to retrieve the associated user for.
 * @param {string}            client.id - A unique string identifying the client.
 *
 * @param {?function(Error,OAuth2AccessToken):callbackReturnType} callback=null -  Node-style callback to be used
 *                                                                                 instead of the returned
 *                                                                                 {@link Promise}.
 *
 * @returns {Promise<?User>|callbackReturnType} - An {@link Object} representing the user, or a falsy value if the client does
 *                                               not have an associated user. The user object is completely transparent
 *                                               to oauth2-server and is simply used as input to other model functions.
 *
 * @template callbackReturnType
 */
export const getUserFromClient = require("./getUserFromClient");


/**
 * Method based on {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#revokeauthorizationcode-code-callback|revokeAuthorizationCode}
 *
 * Invoked to revoke an authorization code.
 *
 * This model function is **required** if the `authorization_code` grant is used.
 *
 * Invoked during:
 *  - `authorization_code` grant
 *
 * @function revokeAuthorizationCode
 *
 * @param {OAuth2AuthorizationCode} code - The authorization code to be revoked.
 * @param {string}                  code.code          - The authorization code.
 * @param {Date}                    code.expiresAt     - The expiry time of the authorization code.
 * @param {string}                  [code.redirectUri] - The redirect URI of the authorization code.
 * @param {string}                  code.scope         - The authorized scope of the authorization code.
 * @param {OAuth2Client}            code.client        - The client associated with the authorization code.
 * @param {string}                  code.client.id        - A unique string identifying the client
 * @param {User}                    code.user          - The user associated with the authorization code
 *
 * @param {?function(Error,OAuth2AccessToken):callbackReturnType} callback=null -  Node-style callback to be used
 *                                                                                 instead of the returned 
 *                                                                                 {@link Promise}.
 * @returns {Promise<boolean>|callbackReturnType} - Return `true` if the revocation was successful or `false`
 *                                                  if the authorization code could not be found.
 *
 * @template callbackReturnType
 */
export const revokeAuthorizationCode = require("./revokeAuthorizationCode");

/**
 * Method based on the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#revoketoken-token-callback|revokeToken}
 *
 * Invoked to revoke a refresh token.
 *
 * This model function is **required** if the `refresh_token` grant is used.
 *
 * **Invoked during:**
 *  - `refresh_token` grant
 *
 * @function revokeToken
 *
 * @param {OAuth2RefreshToken} token - The token to be revoked.
 * @param {string}             token.refreshToken            - The refresh token.
 * @param {string}             [token.refreshTokenExpiresAt] - The expiry time of the refresh token.
 * @param {string}             token.scope                   - The authorized scope of the refresh token.
 * @param {OAuth2Client}       token.client                  - The client associated with the refresh token.
 * @param {string}             token.client.id               - A unique string identifying the client.
 * @param {User}               token.user                    - The user associated with the refresh token.
 *
 * @param {?function(Error,OAuth2AccessToken):callbackReturnType} callback=null -  Node-style callback to be used
 *                                                                                 instead of the returned
 *                                                                                 {@link Promise}.
 *
 * @returns {Promise<boolean>|callbackReturnType} - Return `true` if the revocation was successful or `false` if the
 *                                                  authorization code could not be found.
 *
 * @template callbackReturnType
 */
export const revokeToken = require("./revokeToken");

/**
 * Method based on the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#saveauthorizationcode-code-client-user-callback|saveAuthorizationCode}
 *
 * Invoked to save an authorization code.
 *
 * This model function is **required** if the `authorization_code` grant is used.
 *
 * **Invoked during:**
 *  - `authorization_code` grant
 *
 * @function saveAuthorizationCode
 *
 * @param {OAuth2AuthorizationCode} code  - The code to be saved.
 * @param {string}                  code.code          - The authorization code to be saved.
 * @param {Date}                    code.expiresAt     - The expiry time of the authorization code.
 * @param {string}                  [code.redirectUri] - The redirect URI associated with the authorization code.
 * @param {string}                  code.scope         - The authorized scope of the authorization code.
 * @param {OAuth2Client}            client - The client associated with the authorization code.
 * @param {User}                    user   - The user associated with the authorization code.
 *
 * @param {?function(Error,OAuth2AccessToken):callbackReturnType} callback=null -  Node-style callback to be used
 *                                                                                 instead of the returned
 *                                                                                 {@link Promise}.
 *
 * @returns {Promise<?OAuth2AuthorizationCode>} - An {@link Object} representing the authorization code and associated 
 *                                                data.
 *
 * @template callbackReturnType
 */
export const saveAuthorizationCode = require("./saveAuthorizationCode");



/**
 * Method based on the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#savetoken-token-client-user-callback|saveToken}
 *
 * Invoked to save an access token and optionally a refresh token, depending on the grant type.
 *
 * This model function is **required** for all grant types.
 *
 * **Invoked during:**
 *  - `authorization_code` grant
 *  - `client_credentials` grant
 *  - `implicit` grant
 *  - `refresh_token` grant
 *  - `password` grant
 *
 * @function saveToken
 *
 * @param {OAuth2AccessToken & OAuth2RefreshToken} token - The token(s) to be saved.
 * @param {string}            token.accessToken             - The access token to be saved.
 * @param {Date}              token.accessTokenExpiresAt    - The expiry time of the access token.
 * @param {string}            [token.refreshToken]          - The refresh token to be saved.
 * @param {string}            [token.refreshTokenExpiresAt] - The expiry time of the refresh token.
 * @param {string}            [token.scope]                 - The expiry time of the refresh token.
 * @param {OAuth2Client}      client - The client associated with the token(s).
 * @param {User}              user   - The user associated with the token(s).
 *
 * @param {?function(Error,OAuth2AccessToken):callbackReturnType} callback=null -  Node-style callback to be used
 *                                                                                 instead of the returned
 *                                                                                 {@link Promise}.
 *
 * @returns {Promise<?(OAuth2AccessToken & OAuth2RefreshToken)>|callbackReturnType} - An {@link Object} representing the
 *                                                                                    token(s) and associated data.
 *
 * @template callbackReturnType
 */
export const saveToken = require("./saveToken");

/**
 * Method based on the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#validatescope-user-client-scope-callback|validateScope}
 *
 * Invoked to check if the requested scope is valid for a particular client/user combination.
 *
 * This model function is optional. If not implemented, any scope is accepted.
 *
 * **Invoked during:**
 *  - `authorization_code` grant
 *  - `client_credentials` grant
 *  - `implicit` grant
 *  - `password` grant
 *
 * @param {User}         user   - The associated used
 * @param {OAuth2Client} client - The associated client.
 * @param {string}       client.id - A unique string identifying the client.
 * @param {string}       scope  - The scopes to validate.
 *
 * @param {?function(Error,OAuth2AccessToken):callbackReturnType} callback=null -  Node-style callback to be used
 *                                                                                 instead of the returned
 *                                                                                 {@link Promise}.
 *
 * @returns {Promise<?Array<string>>|callbackReturnType}  - Validated scopes to be used or a falsy value to reject the
 *                                                          requested scopes.
 *
 * @template callbackReturnType
 */
export const validateScope = require("./validateScope");

/**
 * Method based on the {@link https://oauth2-server.readthedocs.io/en/latest/model/spec.html#verifyscope-accesstoken-scope-callback|verifyScope}
 *
 * Invoked during request authentication to check if the provided access token was authorized the requested scopes.
 *
 * This model function is **required** if scopes are used with {@link OAuth2Server#authenticate}.
 *
 * **Invoked during:**
 *  - request authentication
 *
 * @param {OAuth2AccessToken} token - The access token to test against
 * @param {string}            token.accessToken            - The access token.
 * @param {Date}              [token.accessTokenExpiresAt] - The expiry time of the access token.
 * @param {string}            token.scope                  - The authorized scope of the access token.
 * @param {OAuth2Client}      token.client                 - The client associated with the access token.
 * @param {string}            token.client.id                 - A unique string identifying the client.
 * @param {User}              token.user                   - The user associated with the access token.
 * @param {string}            scope - the required scope
 *
 * @param {?function(Error,OAuth2AccessToken):callbackReturnType} callback=null -  Node-style callback to be used
 *                                                                                 instead of the returned
 *                                                                                 {@link Promise}.
 * @returns {Promise<?boolean>|callbackReturnType} - Returns `true` if the access token passes, `false` otherwise.
 */
export const verifyScope = require("./verifyScope");