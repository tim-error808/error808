const { FRONTEND_URL, LOCAL_TEST } = require("./");

/**
 * Options for the `cors`
 */
corsOptions = {
  origin: LOCAL_TEST ? `http://localhost:3000` : FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

module.exports = corsOptions;
