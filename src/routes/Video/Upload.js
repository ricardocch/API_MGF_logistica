const { Router } = require("express");
const {download,merge,upload,deleteVideo} = require("../../controllers/video.js")
const { sendMail } = require("../../controllers/email.js");
// const firebaseAdmin = require('firebase-admin');
const router = Router();
const admin = require("./adminFirebase.js")
// const serviceAccount = require('./../../../firbase/mgflogisitica-firebase-adminsdk.json');
// // firebase.initializeApp(firebaseConfig);
// const admin = firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
// });

router.post("/", async (req, res) => {
  const {
    video,
    name
  } = req.body;

   let flag = await download(video)
   if(flag === 501)
     return res.status(501).send({err:'No se obtuvieron url'})
   else if( flag === 502)
     return res.status(501).send({err:'Error en la descarga'})
 
   flag = await merge(name,video.length)

   if(flag === 503){
    await deleteVideo()
     return res.status(501).send({err:'Fallo en la union de videos'})
   }

   let url = await upload(name,admin)

   if(url === 504){
    await deleteVideo()
     return res.status(501).send({err:'Fallo en subida a fireba'})
   }

  flag = await deleteVideo()

  if(flag === 505)
    return res.status(501).send({err:'Archivo subido Fallo en borrado de archivos'})

  res.send({msg:'Se completo con exito',url})

});

module.exports = router;
