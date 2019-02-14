const functions = require('firebase-functions');
const app = require('./app');

exports.sendEmail = functions.https.onRequest(app);
