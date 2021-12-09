var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Router } = require("express");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const db = require('../src/db');
/* const create = require('./user') */
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/types", function (req, res) { });
router.post('/create', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;
        const admin = req.body.admin;
        const phone = req.body.phone;
        let user = yield db.User.create({
            name,
            password,
            email,
            admin,
            phone,
        });
        console.log(user);
        /* if(created){
            res.status(200).json({msg:'User already exist'})
        } */
        res.status(201).json({ msg: 'User created successfully' });
    }
    catch (err) {
        res.status(404).send(err);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map