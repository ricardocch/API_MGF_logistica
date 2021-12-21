const { Router } = require("express");
const router = Router();
const { Historial } = require("../../db.js");

router.get("/", async function (req, res) {
  try {
    let historial = await Historial.findAll(
      { where: { user: req.params.user } },
      { include: [User, Post] }
    );
    res.json(historial);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
