const handleCallback = async (method, callback) => {
    if(!callback) {
        return await method();
    }
    try{
        const returnValue = await method();
        return callback(null,returnValue);
    }catch(error){
        return callback(error);
    }
}

module.exports = handleCallback;
