const admin = require("firebase-admin");
const { SERVICE_ACCOUNT } = require("../config/config-firebase");

admin.initializeApp({
  credential: admin.credential.cert(SERVICE_ACCOUNT),
});

const db = admin.firestore();

module.exports = { db };
