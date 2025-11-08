/**
 * Ensures that callback function is ran properly if callback function is available
 *
 * @function handleCallback
 *
 * @param {function():Promise<methodReturnType>}  method                 - method to be run before callback
 * @param {function(Error,methodReturnType):callbackReturnType} callback - callback function
 *
 * @returns {Promise<methodReturnType>|callbackReturnType}               - callback's return if ran or method's return if not
 *
 * @template methodReturnType
 * @template callbackReturnType
 */
export const handleCallback = require('./handleCallback');