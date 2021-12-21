const { Router } = require("express");
const router = Router();
const { LicensePlate } = require("../../db.js");

router.get("/", async (req, res) => {
  try {
    let Licenses = await LicensePlate.findAll();
    return res.json(Licenses);
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
