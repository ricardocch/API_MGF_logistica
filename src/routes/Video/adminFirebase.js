const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./../../../firbase/mgflogisitica-firebase-adminsdk.json');
// firebase.initializeApp(firebaseConfig);
const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

module.exports =  admin
