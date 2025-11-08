const conventionalizeClient = (object, internal = false) => {
    let client = object;
    if (internal) {
        client = object.client;
    }
    if (!client) return null;
    //WARNING: clientSecretHashed must not be passed to return for security reasons
    const {_id, clientSecretHashed:hiddenSecret, ...restClient} = client;
    const conventionalClient = {id:_id, ...restClient};
    if(!internal){
        return conventionalClient;
    }
    const {client:ignoredClient, ...restObject} = object;

    return {client:conventionalClient,...restObject};
}

module.exports = conventionalizeClient;