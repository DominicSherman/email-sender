const functions = require('firebase-functions');
const app = require('./src/app');

exports.sendEmail = functions.https.onRequest(app);
