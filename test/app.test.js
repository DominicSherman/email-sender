const request = require('supertest');

const Chance = require('chance');
const chance = new Chance();

const app = require('../src/app');

describe('app', () => {
    let expectedEmail,
        expectedSubject,
        expectedText,
        expectedParameters;

    beforeEach(() => {
        expectedEmail = chance.email();
        expectedSubject = chance.word();
        expectedText = chance.word();
        expectedParameters = `to=${expectedEmail}&subject=${expectedSubject}&text=${expectedText}`;
    });

    it('should call return a 200 when it is a valid request', async () => {
        await request(app).get(`/?${expectedParameters}`).then((response) => {
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Email sent!');
        });
    });

    it('should throw a 400 when it is not a valid request', async () => {
        await request(app).get('/').then((response) => {
            expect(response.status).toBe(400);
        });
    });
});