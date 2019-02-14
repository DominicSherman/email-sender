const nodemailer = require('nodemailer');
const pass = require('../config');
const express = require('express');
const app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mariobrothersdeveloper@gmail.com',
        pass
    }
});

const getMailOptions = ({to, subject, text}) => ({
    from: 'mariobrothersdeveloper@gmail.com',
    to,
    subject,
    text,
});

const handleResponse = (res, error) => {
    if (error) {
        return res.status(400).send({error});
    }

    return res.status(200).send({message: 'Email sent!'});
};

app.get('/', (req, res) => transporter.sendMail(
    getMailOptions(req.query),
    (error) => handleResponse(res, error)
));

module.exports = app;