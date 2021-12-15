const { Router } = require("express");
const router = Router();
const user = require("./Users/createUser");
const modify = require("./Users/updatepass");
const deleted = require("./Users/deleteuser");
const typeUser = require("./Users/typeUser");
const listUser = require("./Users/listUser");
const createDriver = require("./Drivers/createDriver")
const deleteDriver = require('./Drivers/deleteDriver')
const drivers = require('./Drivers/listDriver')
const createLPlate = require('./LicensePlate/createLPlate')
const deleteLPlate = require('./LicensePlate/deleteLPlate')
const lPlate = require('./LicensePlate/listLPlate')
const createPost = require('./Post/createPost')

router.use("/user/create", user);
router.use("/user/update", modify);
router.use("/user/delete", deleted);
router.use("/user", listUser);
router.use("/driver/create",createDriver);
router.use("/driver/delete",deleteDriver);
router.use("/driver",drivers);
router.use("/licenseplate/create",createLPlate);
router.use("/licenseplate/delete",deleteLPlate);
router.use("/licenseplate",lPlate);
router.use("/post/create",createPost);


module.exports = router;
