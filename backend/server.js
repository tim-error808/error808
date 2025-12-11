const express = require("express");
require("dotenv").config();
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("./middlewares/passport");
const MongoStore = require("connect-mongo");
const cors = require("cors");

const {
  REST_API_PORT,
  secrets: { MONGODB_URI },
} = require("./config");
const originRouter = require("./routes");
const corsOptions = require("./config/corsOptions");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error(`Error while connecting to MongoDB.`);
    throw error;
  });

const app = express()
  .use(cors(corsOptions))
  .use(
    session({
      secret: "your_secret_key",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGODB_URI,
        collectionName: "sessions",
        ttl: 60 * 60 * 24 * 7,
      }),
      cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }, // Set to true if using HTTPS
    })
  )
  .use(express.json())
  .use(passport.initialize())
  .use(passport.session())
  .use("/", originRouter);

app.get("/check", (req, res) => {
  res.json({ status: "Server is working" });
});

const listenCallback = (error) => {
  if (error) {
    console.log("Error while starting REST API");
    throw error;
  }
  console.log(`REST API started on port ${REST_API_PORT}`);
};

app.listen(REST_API_PORT, listenCallback);
