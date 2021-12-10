const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
const routes = require("./routes/index.ts");
server.use(express.json());
server.use('/', routes);
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
//# sourceMappingURL=app.js.map