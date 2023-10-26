const request = require('supertest');
const app = require('./server'); // Import your app

describe('GET /country/:name', () => {
    it('responds with country data', async () => {
        const countryName = 'netherlands'; // replace with the country you want to test
        const res = await request(app).get(`/country/${countryName}`);

        expect(res.statusCode).toEqual(200);

    });
});
