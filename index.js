const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send({
    body: 'Hello world!'
}));

exports.sendEmail = functions.https.onRequest(app);
