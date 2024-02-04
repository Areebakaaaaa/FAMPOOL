const admin = require('firebase-admin');

const serviceAccount = require('../fampool-6de94-firebase-adminsdk-cp0ax-4c51c5e957.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fampool-6de94-default-rtdb.firebaseio.com', 
});

const AdminFirestore = admin.firestore();
const storage = admin.storage();

module.exports = {AdminFirestore, storage}