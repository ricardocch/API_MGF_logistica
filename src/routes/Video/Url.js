const { Router } = require("express");
const {getUrl} = require("../../controllers/video.js")
// const firebaseAdmin = require('firebase-admin');
const router = Router();
// const serviceAccount = require('./../../../firbase/mgflogisitica-firebase-adminsdk.json');
// // firebase.initializeApp(firebaseConfig);
// const admin = firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
// });
const admin = require("./adminFirebase.js")

router.get("/", async (req, res) => {
  const {
    name
  } = req.query;
  
  let url = await getUrl(name,admin)
  
  if(url === 505)
    return res.status(506).send('No se encontro el video en Firebas')
  
  res.status(200).send({url})

  
  
});

module.exports = router;
