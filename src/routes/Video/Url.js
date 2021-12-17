const { Router } = require("express");
const { sendMail } = require("../../controllers/email.js");
const router = Router();
const { default: axios } = require("axios");


router.post("/", async (req, res) => {
  const {
    videos
  } = req.body;

  
});

module.exports = router;
