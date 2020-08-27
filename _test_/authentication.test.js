/** @format */

const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbConfig');
const { testing } = require('../knexfile');

describe('Authentication testing', () => {
	beforeEach(async () => {
		await db('users').truncate();
	});

	test('verify registration', async () => {
		await request(server)
			.post('/api/auth/register')
			.send({
				username: 'Wolfenstien3D',
				password: 'm4ch1n36un',
				avatar: 'grimmace.jpg',
				role: 1,
				first_name: 'Doom',
				last_name: 'Guy',
				email: 'somefps@killer.com',
			})
			.then((res) => expect(res.status).toBe(201))
			.catch((err) => console.log(err));
	});
	test('verify json', async () => {
		await request(server)
			.post('/api/auth/register')
			.send({
				username: 'TheMachine',
				password: '7ru573d',
				avatar: 'billy.jpg',
				role: 2,
				first_name: 'Jarell',
				last_name: 'Ophensmire',
				email: 'themachine@machine.com',
			})
			.then((res) => expect(res.type).toBe('application/json'))
			.catch((err) => console.log(err));
	});

	test('Login test #1', async () => {
		const user = {
			username: 'Timmy',
			password: 'Potato',
			avatar: 'taco.jpg',
			role: 2,
			first_name: 'Timmy',
			last_name: 'Panderosa',
			email: 'something@email.com',
		};
		const user_login = { username: 'Timmy', password: 'Potato' };
		await request(server)
			.post('/api/auth/register')
			.send(user)
			.then(async (res) => {
				await request(server)
					.post('/api/auth/login')
					.send(user_login)

					.then((res) => expect(res.status).toBe(200));
			})
			.catch((err) => console.log(err));
	});

	it('verify json object', async () => {
		await request(server)
			.post('/api/auth/register')
			.send({
				username: 'Samantha256',
				password: 'Aquamarine',
				avatar: 'ocean.jpg',
				role: 2,
				first_name: 'Samantha',
				last_name: 'Scott',
				email: 'sammytheseahorse@email.com',
			})
			.then(async () => {
				await request(server)
					.post('/api/auth/login')
					.send({ username: 'Samantha256', password: 'Aquamarine' })
					.then((res) => {
						expect(res.type).toBe('application/json');
					})
					.catch((err) => console.log(err));
			});
	});
});
