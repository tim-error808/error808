const {FRONTED_PORT} = require("./index");

/**
 * Options for the `cors`
 */
corsOptions = {
    origin: `*`, // TODO: WARNING: This is temporary
    methods: ["GET", "POST"],
    allowedOrigins: ["*"],
    credentials: true,
}

module.exports = corsOptions;
