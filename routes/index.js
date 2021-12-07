const { Router } = require("express");
const axios = require("axios");
const server = require("../app.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/types", function (req, res) {});

module.exports = router;
