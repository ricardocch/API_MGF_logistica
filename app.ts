const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
server.use(cors());
server.use(morgan("dev"));
// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
module.exports = server;  