const { initializeApp, cert } = require("firebase-admin/app");

const serviceAccount = require("../../smart-deals-firebase-adminsdk.json");

initializeApp({
  credential: cert(serviceAccount),
});
