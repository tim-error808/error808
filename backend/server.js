const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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
  .use(cookieParser())
  .use(cors(corsOptions))
  .use(express.json())
  .use("/uploads", express.static("uploads"))
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
