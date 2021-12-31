const { Router } = require("express");
const router = Router();
const { Post, User, Driver, LicensePlate } = require("../../db.js");

router.get("/", async function (req, res) {
  const { user, admin } = req.query;
  try {
    if (admin === true) {
      let posts = await Post.findAll();
      return res.json(posts);
    }
    // let foundUser = await User.findOne({ where: { user: user } });
    let postsUser = await Post.findAll();
    return res.json(postsUser);
  } catch (err) {
    res.status(500).send({ err: err, msg: "Algo sucedió en la ruta" });
  }
});

module.exports = router;
