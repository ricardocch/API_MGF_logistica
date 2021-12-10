var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Router } = require('express');
const { User } = require('../src/db');
const router = Router();
router.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let { name, password, email, admin, phone } = req.body;
        let [user, created] = yield User.findOrCreate({ where: {
                name: name
            },
            defaults: {
                name: name,
                password: password,
                email: email,
                admin: admin,
                phone: phone
            }
        });
        if (created) {
            res.status(200).json({ msg: 'User already exist' });
        }
        res.status(201).json({ msg: 'User created successfully' });
    }
    catch (_a) {
        res.status(404).send('cannot create a user');
    }
}));
module.exports = router;
//# sourceMappingURL=user.js.map