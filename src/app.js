const express = require('express');
const app = express();
const nodemailConfig = require('./nodemail-config');

const handleResponse = (res, error) => {
    if (error) {
        return res.status(400).send({error});
    }

    return res.status(200).send({message: 'Email sent!'});
};

app.get('/', (req, res) => nodemailConfig.getTransporter().sendMail(
    nodemailConfig.getMailOptions(req.query),
    (error) => handleResponse(res, error)
));

module.exports = app;