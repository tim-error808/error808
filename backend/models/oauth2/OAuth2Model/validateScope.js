const {Type: {ObjectId}} = require('mongoose');

const {handleCallback} = require("../../../lib");

const {VALID_SCOPES,ACCEPT_PARTIALLY_VALID_SCOPES } = require('../../../config');

const UsersModel = require('../../UsersModel');

const validateScope = async (user, client, scope, callback) =>
    await handleCallback(async ()=> {
        const userScope = await UsersModel.findOne({_id: new ObjectId(user.id)}).lean().scope;
        let newScope = scope.filter(element =>
          VALID_SCOPES.includes(element.scope) &&
          userScope.includes(element.scope)
        );
        if (ACCEPT_PARTIALLY_VALID_SCOPES || newScope.length === scope.length) {
            return newScope;
        }
        return false;
    },callback);

module.exports = validateScope;