const { Router } = require("express");
const router = Router();
const { User } = require("../../db.js");

router.post("/", async (req, res) => {
  try {
    const { username, correo } = req.body;

    const user = await User.findOne({
      where: {
        user: username,
      },
    });

    if (!user) {
      throw "Username does not exist.";
    }

    await user.update({ email: correo });

    await user.save();

    if (user.password === pass) {
      return res.status(200).send("Password modified.");
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
