const { Router } = require("express");
const { sendMail } = require("../../controllers/email.js");
const { User, LicensePlate, Post, Driver } = require("../../db.js");
var bcrypt = require("bcryptjs");
const router = Router();

const { default: axios } = require("axios");
const Md5 = require("md5");
const utf8 = require("utf8");
const { APP_KEY, APP_SECRET } = process.env;
const { Token } = require("../../db");

router.post("/", async (req, res) => {
  const {
    user,
    date,
    roadMap,
    origin,
    destination,
    departureTime,
    arrivalTime,
    video,
    licensePlate,
    driver,
    operator,
  } = req.body;

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

    const post = await Post.create({
      date: date,
      roadMap: roadMap,
      origin: origin,
      destination: destination,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      video: video,
      author: operator,
    });
    await Post.add(foundUser, foundDriver, foundLicense);

    res.status(201).json({ msg: "Post Was successfully created" });
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

module.exports = router;
