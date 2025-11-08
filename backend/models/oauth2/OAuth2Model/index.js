// TODO: Document this Model with comments


/**
 *
 * @type {(function(*, null=): Promise<*>)|{}}
 */
export const getAccessToken = require("./getAccessToken");
export const getAuthorizationCode = require("./getAuthorizationCode")
export const getClient = require("./getClient");
export const getRefreshToken = require("./getRefreshToken");
export const getUser = require("./getUser");
export const getUserFromClient = require("./getUserFromClient");
export const revokeAuthorizationCode = require("./revokeAuthorizationCode");
export const revokeToken = require("./revokeToken");
export const saveAuthorizationCode = require("./saveAuthorizationCode");
export const saveToken = require("./saveToken");
export const validateScope = require("./validateScope");
export const verifyScope = require("./verifyScope");
