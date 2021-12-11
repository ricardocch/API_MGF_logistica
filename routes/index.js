const { Router } = require("express");
const router = Router();
const user = require("./User")


router.get("/types", function (req, res) {});
router.use('/create',user)


module.exports = router;
