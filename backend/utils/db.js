/* const admin = require('firebase-admin');

// const serviceAccount = require('../fampool-6de94-firebase-adminsdk-cp0ax-4c51c5e957.json');

const serviceAccount = require('../service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fampool-2bc42-default-rtdb.firebaseio.com/', 
});

const AdminFirestore = admin.firestore();
const storage = admin.storage();

module.exports = {AdminFirestore, storage} */

const admin = require('firebase-admin');

const serviceAccount = require('../fampool-2bc42-firebase-adminsdk-46k8f-9cea0cd195.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const AdminFirestore = admin.firestore();
const storage = admin.storage();

module.exports = { AdminFirestore, storage };
