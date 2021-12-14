const { Router } = require("express");
const router = Router();
const user = require("./users/User");
const modify = require("./users/updatepass");
const deleted = require("./users/deleteuser");
const typeUser = require("./users/typeUser");
const listUser = require("./users/listUser");

router.use("/create", user);
router.use("/updatepass", modify);
router.use("/delete", deleted);
router.use("/list", listUser);

module.exports = router;
