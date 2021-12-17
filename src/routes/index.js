const { Router } = require("express");
const router = Router();

/* --------------------------------USERS-------------------------------- */
const user = require("./Users/createUser");
const modify = require("./Users/updatepass");
const deleted = require("./Users/deleteuser");
const typeUser = require("./Users/typeUser");
const listUser = require("./Users/listUser");
router.use("/user/create", user);
router.use("/user/update", modify);
router.use("/user/delete", deleted);
router.use("/user", listUser);
/* --------------------------------USERS-------------------------------- */

/* --------------------------------DRIVERS-------------------------------- */
const createDriver = require("./Drivers/createDriver");
const deleteDriver = require("./Drivers/deleteDriver");
const drivers = require("./Drivers/listDriver");
router.use("/driver/create", createDriver);
router.use("/driver/delete", deleteDriver);
router.use("/driver", drivers);
/* --------------------------------DRIVERS-------------------------------- */

/* --------------------------------LicensePlate-------------------------------- */
const createLPlate = require("./LicensePlate/createLPlate");
const deleteLPlate = require("./LicensePlate/deleteLPlate");
const lPlate = require("./LicensePlate/listLPlate");
router.use("/licenseplate/create", createLPlate);
router.use("/licenseplate/delete", deleteLPlate);
router.use("/licenseplate", lPlate);
/* --------------------------------LicensePlate--------------------------------*/

/* --------------------------------Post-------------------------------- */
const createPost = require("./Post/createPost");
const listPost = require("./Post/listPost");
router.use("/post/create", createPost);
router.use("/post/listPost", listPost);
/* --------------------------------Post-------------------------------- */

/* --------------------------------JIMI API-------------------------------- */

const accountList = require("./Api-Jimi/count-list-route");
const detailsInformation = require("./Api-Jimi/details-information-route");
const videoUrlHistory = require("./Api-Jimi/video-url-history");
const coordsOfDay = require("./Api-Jimi/coords-of-day");
const videoOfDay = require("./Api-Jimi/video-of-day");
router.use("/account-list", accountList);
router.use("/detail-information", detailsInformation);
router.use("/coords-of-day", coordsOfDay);
router.use("/video-of-day", videoOfDay);
router.use("/video-url-history", videoUrlHistory);

/* --------------------------------JIMI API-------------------------------- */


/* --------------------------------Video-------------------------------- */

const upload = require("./Video/Upload");
const url = require("./Video/Url");
router.use("/video/upload", upload);
router.use("/video/URL", url);

/* --------------------------------Video-------------------------------- */

module.exports = router;
