const { Router } = require("express");
const router = Router();
const { Post, User, Driver, LicensePlate } = require("../../db.js");

router.get("/", async function (req, res) {
  const { user, admin } = req.query;
  try {
    let posts = await Post.findAll();
    if (admin === true) {
      return res.json(posts);
    }
    let foundUser = await User.findOne({ where: { user: user } });
    let postsUser = posts.filter((e) => e.userId === foundUser.id);
    return res.json(postsUser);
  } catch (err) {
    res.status(500).send({ err: err, msg: "Algo sucedió en la ruta" });
  }
});

module.exports = router;
