const nodemailer = require('nodemailer');
const pass = require('../config');

module.exports = {
    getTransporter: () => nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mariobrothersdeveloper@gmail.com',
            pass
        }
    }),
    getMailOptions: ({to, subject, text}) => ({
        from: 'mariobrothersdeveloper@gmail.com',
        to,
        subject,
        text,
    })
};