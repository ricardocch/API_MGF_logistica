const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const { User, LicensePlate } = require("../../db");

router.delete("/delete", async function (req, res) {
  try {
    await User.update(
      { active: false },
      {
        where: {
          name: req.body.user,
        },
      }
    );
    res.status(200).send({ msg: "Usuario eliminado con exito" });
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
