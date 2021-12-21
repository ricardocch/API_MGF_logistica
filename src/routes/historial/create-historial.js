const { Router } = require("express");
const router = Router();
const { Historial, User, Post } = require("../../db.js");

router.post("/", async function (req, res) {
  const { user, hojaDeRuta } = req.body;
  try {
    const foundUser = await User.findOne({
      where: { user: user },
    });

    const foundPost = await Post.findOne({
      where: { roadMap: hojaDeRuta },
    });

    const historial = await Post.create({});
    await Historial.add(foundUser, foundPost);

    res.status(201).json({ msg: "Historial Was successfully created" });
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
