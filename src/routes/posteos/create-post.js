const { Router } = require("express");
const { sendMail } = require("../../controllers/email.js");
const { User, LicensePlate, Post, Driver } = require("../../db.js");
const router = Router();

router.post("/", async (req, res) => {
  const {
    user,
    date,
    roadMap,
    origin,
    destination,
    departureTime,
    arrivalTime,
    licensePlate,
    driver,
    operator,
  } = req.body;
  if (
    !user ||
    !date ||
    !roadMap ||
    !origin ||
    !destination ||
    !departureTime ||
    !arrivalTime ||
    !licensePlate ||
    !driver ||
    !operator
  )
    return res.status(200).send({ msg: "faltan campos por rellenar" });
  try {
    const foundUser = await User.findOne({
      where: { user: user },
    });

    const foundDriver = await Driver.findOne({
      where: { name: driver },
    });
    const foundLicense = await LicensePlate.findOne({
      where: { name: licensePlate },
    });
    if (!foundUser)
      return res.status(404).send({ msg: `No se encontró el user: ${user}` });
    if (!foundLicense)
      return res
        .status(404)
        .send({ msg: `No se encontró la patente: ${licensePlate}` });
    if (!foundDriver)
      return res
        .status(404)
        .send({ msg: `No se encontró la conductor: ${driver}` });

    const post = await Post.create({
      date: date,
      roadMap: roadMap,
      origin: origin,
      destination: destination,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      author: operator,
    });

    await foundUser.addPost(post);
    await foundDriver.addPost(post);
    await foundLicense.addPost(post);
    res.status(201).json({
      msg: "Post Was successfully created",
    });
  } catch (err) {
    res.status(404).send({ err: err });
  }
});

module.exports = router;
