const { Router } = require("express");
const axios = require("axios");
const { User, LicensePlate } = require("../src/db.ts");
var bcrypt = require("bcrypt");
const router = Router();

router.get("/types", function (req, res) {});
router.post("/create", async (req, res) => {
  try {
    const { name, email, admin, phone, password, cuit } = req.body;

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      throw new Error(
        "Password must have at least 8 chars 1 Uppercase, 1 lowercase,1 number and 1 special character"
      );
    }

    let salt = bcrypt.genSaltSync(10);
    let pass = bcrypt.hashSync(password, salt);
    console.log(pass);

    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      throw new Error("Name must only have numbers and letters");
    }

    let [user, userCreated] = await User.findOrCreate({
      where: { name: name, cuit: cuit },
      defaults: {
        name: name,
        password: pass,
        email: email,
        admin: admin,
        phone: phone,
        cuit: cuit,
      },
    });

    if (userCreated) {
      return res.status(200).send("User created successfully");
    }
    console.log("45 - UserCreated?", userCreated);

    res.status(201).json(pass);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

router.post("/compare", async (req, res) => {
  try {
    const { user, password } = req.body;
    const usr = await User.findOne({ where: { name: user } });
    console.log(usr);

    if (bcrypt.compareSync(password, usr.password)) {
      res.status(200).send("found");
    } else {
      throw "Incorrect password";
    }
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

module.exports = router;
