/** @format */

const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbConfig');

describe('testing for validation - server.js', () => {
	test('that the testing environment is set up', () => {
		expect(process.env.DB_ENV).toBe('testing');
	});
});
describe('server', () => {
	it('returns a JSON object', async () => {
		const messageOfTheDay = 'Something!';
		const res = await request(server).get('/');
		expect(res.status).toEqual(200);
	});

	it('return a 200', () => {
		return request(server)
			.get('/api/campaign')
			.then((camp) => {
				expect(camp.status).toEqual(200);
			});
	});
});
