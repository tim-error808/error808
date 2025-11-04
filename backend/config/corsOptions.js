const {FRONTED_PORT} = require("./index");

corsOptions = {
    origin: `http://localhost:${FRONTED_PORT}`,
    methods: ["GET", "POST"],
    allowedOrigins: ["*"],
    credentials: true,
}

module.exports = corsOptions;