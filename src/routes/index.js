const { Router } = require("express");
const router = Router();
const user = require("./users/User");
const modify = require("./users/updatepass");
const deleted = require("./users/deleteuser");
router.use("/create", user);
router.use("/updatepass", modify);
router.use("/deleteuser", deleted);

module.exports = router;
