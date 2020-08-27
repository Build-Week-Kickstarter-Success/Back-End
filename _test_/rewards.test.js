const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbConfig');
const { testing } = require('../knexfile');


let token;

describe('Rewards Endpoint testing', () => {
 
    beforeAll(async () => {
        await db('users').truncate();
        await db('campaign').truncate();
        await db('rewards').truncate();

        await request(server)
        .post('/api/auth/register')
        .send({
            username: 'Lutinia',
				password: '5341c1u883r',
				avatar: 'sealeo.png',
				role: 2,
				first_name: 'Lutra',
				last_name: 'Lugana',
				email: 'lutinia@fluffy.org',
        })
        .then(async () => {
            await request(server)
                .post('/api/auth/login')
                .send({username: 'Lutinia', password: '5341c1u883r'})
                .then((res) => {
                    token = res.body.token;
                })
        })
        .then(async () => {
            await request(server)
            .post('/api/campaign')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Save the Seals",
                video: "oceansealsvid.mp4",
                desc: "Seals die due to over fishing yearly",
                keywords : "seals, ocean",
                disable_communication: 0,
                country: "US",
                currency: "Dollar",
                goal: 2000000000,
                campaign_length: 365,
                user_id: 1
            })
        })
    })
    beforeEach(async () => {
        await db('rewards').truncate();
    })

    describe('CRUD a reward', () => {

        test('Post a reward', async () => {
            await request(server)
            .post('/api/rewards')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Name on the side of a boat',
                campaign_id: 1,
                milestone: 25,
                description: `When you pledge $25, I'll put your name on the side of a boat.` 
            })
            .then((res) => expect(res.status).toBe(201))
            .catch((err) => console.log(err));
        })

        test('Update a rewards', async () => {
            await request(server)
            .post('/api/rewards')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'A video shoutout',
                campaign_id: 1,
                milestone: 15,
                description: `I'll shout your name out in an update video with $15!` 
            })
            .then(async () =>
                await request(server)
                .put('/api/rewards/1')
                .set('Authorization', `Bearer ${token}`)
                .send({name: 'Live Shoutout!'})
                )
            .then((res) => expect(res.status).toBe(200))
            .catch((err) => console.log(err));
        })
        test('Delete a rewards', async () => {
            await request(server)
            .post('/api/rewards')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Bad milestone',
                campaign_id: 1,
                milestone: 125,
                description: `Placeholder.` 
            })
            .then(async () =>
                await request(server)
                .del('/api/rewards/1')
                .set('Authorization', `Bearer ${token}`)
                )
            .then((res) => expect(res.type).toBe('application/json'))
            .catch((err) => console.log(err));
        })
    })




})