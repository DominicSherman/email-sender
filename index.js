const functions = require('firebase-functions');
const express = require('express');
const app = express();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mariobrothersdeveloper@gmail.com',
        pass: 'Password#123!'
    }
});

const getMailOptions = ({to, subject, text}) => ({
    from: 'mariobrothersdeveloper@gmail.com',
    to,
    subject,
    text,
});

app.get('/', async (req, res) => {
    await transporter.sendMail(getMailOptions(req.query), (error) => {
        if (error) {
            return res.send({
                status: 404,
                error
            })
        } else {
            return res.send({
                status: 200
            })
        }
    });
});

exports.sendEmail = functions.https.onRequest(app);
