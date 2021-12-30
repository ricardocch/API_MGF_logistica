const { Router } = require("express");
const { LicensePlate } = require("../../db.js");
const router = Router();

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const [license, created] = await LicensePlate.findOrCreate({
      where: {
        name: name,
      },
      defaults: {
        name: name,
      },
    });
    if (created) {
      return res
        .status(201)
        .json({ msg: "Successfully Created", license: license.name });
    }

    res.status(200).json({ msg: "License Plate already exists" });
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
