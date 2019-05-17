jest.mock('firebase-functions', () => ({
    https: {
        onRequest: jest.fn()
    }
}));

const functions = require('firebase-functions');
const app = require('../src/app');

describe('index', () => {
    it('should call onRequest from firebase functions', () => {
        require('../index');

        expect(functions.https.onRequest).toHaveBeenCalledTimes(1);
        expect(functions.https.onRequest).toHaveBeenCalledWith(app);
    });
});