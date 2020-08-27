const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbConfig');
const { testing } = require('../knexfile');


let token;

describe('Updates Endpoint testing', () => {
 
    beforeAll(async () => {
        await db('users').truncate();
        await db('campaign').truncate();
        await db('updates').truncate();

        await request(server)
        .post('/api/auth/register')
        .send({
            username: 'Phoenix',
				password: 'f1r3574rt3R',
				avatar: 'flamebirb.png',
				role: 2,
				first_name: 'Felix',
				last_name: 'Hinoarashi',
				email: 'phoenix789@flame.net',
        })
        .then(async () => {
            await request(server)
                .post('/api/auth/login')
                .send({username: 'Phoenix', password: 'f1r3574rt3R'})
                .then((res) => {
                    token = res.body.token;
                })
        })
        .then(async () => {
            await request(server)
            .post('/api/campaign')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "FIRE BIRD - A Revolutionary Personal Jetpack",
                video: "firebird.avi",
                desc: "Be able to fly vast distances with this jetpack",
                keywords : "fire, bird, jetpack",
                disable_communication: 0,
                country: "US",
                currency: "Dollar",
                goal: 26890235211,
                campaign_length: 30,
                user_id: 1
            })
        })
    })
    beforeEach(async () => {
        await db('updates').truncate();
    })

    describe('CRUD an update', () => {

        test('Post an update', async () => {
            await request(server)
            .post('/api/updates')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'First Test!',
                campaign_id: 1,
                description: 'With the prototype finished, our first test is Aug 31st!'
            })
            .then((res) => expect(res.status).toBe(201))
            .catch((err) => console.log(err));
        })

        test('Update an update', async () => {
            await request(server)
            .post('/api/updates')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Signed with a Paint company!',
                campaign_id: 1,
                description: 'Our jetpack now comes in 4 colors!'
            })
            .then(async () =>
                await request(server)
                .put('/api/updates/1')
                .set('Authorization', `Bearer ${token}`)
                .send({name: 'Established Paint Partner!'})
                )
            .then((res) => expect(res.status).toBe(200))
            .catch((err) => console.log(err));
        })
        test('Delete an update', async () => {
            await request(server)
            .post('/api/updates')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'The Firebird is a dud.',
                campaign_id: 1,
                description: 'Our last test ended up in ashes. Dust to Dust.'
            })
            .then(async () =>
                await request(server)
                .del('/api/updates/1')
                .set('Authorization', `Bearer ${token}`)
                )
            .then((res) => expect(res.type).toBe('application/json'))
            .catch((err) => console.log(err));
        })
    })




})