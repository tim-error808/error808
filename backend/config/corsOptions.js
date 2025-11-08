const {FRONTED_PORT} = require("./index");

/**
 * Options for the `cors`
 */
corsOptions = {
    origin: `http://localhost:${FRONTED_PORT}`,
    methods: ["GET", "POST"],
    allowedOrigins: ["*"],
    credentials: true,
}

module.exports = corsOptions;