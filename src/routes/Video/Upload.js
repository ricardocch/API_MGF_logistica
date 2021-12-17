const { Router } = require("express");
const {download} = require("../../controllers/video.js")
const { sendMail } = require("../../controllers/email.js");

const router = Router();


router.post("/", async (req, res) => {
  const {
    videos
  } = req.body;




});

module.exports = router;
