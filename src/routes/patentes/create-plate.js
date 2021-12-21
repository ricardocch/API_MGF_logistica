const { Router } = require("express");
const { LicensePlate } = require("../../db.js");
const router = Router();

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const license = await LicensePlate.create({
      name: name,
    });

    res.status(201).json({ msg: "Successfully Created", license: license });
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
