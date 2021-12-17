const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./../../../firbase/mgflogisitica-firebase-adminsdk.json');
// firebase.initializeApp(firebaseConfig);

//se inicializa firebase aqui, porque solo puede ser inicializado una vez en toda la Api
//se exporta la inicializacion a los lugares donde se ocupa
const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

module.exports =  admin
