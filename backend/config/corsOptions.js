const { FRONTED_PORT } = require("./index");

/**
 * Options for the `cors`
 */
corsOptions = {
  origin: [
    "https://proud-smoke-033478b03.3.azurestaticapps.net",
    `http://localhost:3000`,
  ],
  methods: ["GET", "POST"],
  credentials: true,
};

module.exports = corsOptions;
