const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
/* security middleware library import */
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const router = require("./src//routes/api");

/* cors */
app.use(cors());

/* security */
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

/* body parser */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
/* request rate limit */
const limiter = rateLimit({ windowMs: 15 * 60 * 100, max: 3000 });
app.use(limiter);
/* router */
app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome here" });
});

app.get("*", (req, res) => {
  res.status(404).json({ status: "failed", data: "Not found" });
});
module.exports = app;
