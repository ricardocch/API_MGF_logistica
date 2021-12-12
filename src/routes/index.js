const { Router } = require("express");
const router = Router();
const user = require("./users/User");
const modify = require("./users/updatepass");
const deleted = require("./users/deleteuser");
const typeUser = require("./users/typeUser");

router.use("/create", user);
router.use("/updatepass", modify);
router.use("/delete", deleted);
router.use("/typeuser", typeUser);

module.exports = router;
