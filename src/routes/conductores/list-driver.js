const { Router } = require("express");
const router = Router();
const { Driver } = require("../../db.js");

router.get("/", async function (req, res) {
  try {
    let drivers = await Driver.findAll();

    res.json(drivers);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
