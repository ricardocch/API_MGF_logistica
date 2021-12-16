const { Router } = require("express");
const router = Router();
const user = require("./Users/createUser");
const modify = require("./Users/updatepass");
const deleted = require("./Users/deleteuser");
const typeUser = require("./Users/typeUser");
const listUser = require("./Users/listUser");
const createDriver = require("./Drivers/createDriver");
const deleteDriver = require("./Drivers/deleteDriver");
const drivers = require("./Drivers/listDriver");
const createLPlate = require("./LicensePlate/createLPlate");
const deleteLPlate = require("./LicensePlate/deleteLPlate");
const lPlate = require("./LicensePlate/listLPlate");
const createPost = require("./Post/createPost");

/* JIMI API */

const accountList = require("./count-list-route");
const detailsInformation = require("./details-information-route");
const videoUrlHistory = require("./video-url-history");
const coordsOfDay = require("./coords-of-day");
const videoOfDay = require("./video-of-day");
router.use("/account-list", accountList);
router.use("/detail-information", detailsInformation);
router.use("/coords-of-day", coordsOfDay);
router.use("/video-of-day", videoOfDay);
router.use("/video-url-history", videoUrlHistory);

/* JIMI API */

router.use("/user/create", user);
router.use("/user/update", modify);
router.use("/user/delete", deleted);
router.use("/user", listUser);
router.use("/driver/create", createDriver);
router.use("/driver/delete", deleteDriver);
router.use("/driver", drivers);
router.use("/licenseplate/create", createLPlate);
router.use("/licenseplate/delete", deleteLPlate);
router.use("/licenseplate", lPlate);
router.use("/post/create", createPost);
