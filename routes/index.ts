const { Router } = require("express");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// router.use('/auth', authRouter);

//este endPoint es de prueba
router.get("/types", function (req, res) {
    res.send('paso')
});

module.exports = router;
