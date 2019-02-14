const Chance = require('chance');
const chance = new Chance();
const request = require('supertest');
const app = require('../src/app');
const nodemailConfig = require('../src/nodemail-config');

// jest.mock('../src/nodemail-config');

describe('app', () => {
    let expectedEmail,
        expectedSubject,
        expectedText,
        expectedParameters,
        expectedTransporter;

    beforeEach(() => {
        expectedEmail = chance.email();
        expectedSubject = chance.word();
        expectedText = chance.word();
        expectedParameters = `to=${expectedEmail}&subject=${expectedSubject}&text=${expectedText}`;
        expectedTransporter = {
            sendMail: jest.fn()
        };
        nodemailConfig.getTransporter = jest.fn(() => expectedTransporter);
        nodemailConfig.getMailOptions = jest.fn();
    });

    it('should call return a 200 when it is a valid request', async () => {
        await request(app).get(`/?${expectedParameters}`).then((response) => {
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Email sent!');
        });
    });

    it('should call use the transporter from nodemailer', async () => {
        await request(app).get(`/?${expectedParameters}`);

        expect(nodemailConfig.getTransporter).toHaveBeenCalledTimes(1);
    });
});