const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbConfig');
const { testing } = require('../knexfile');


let token;

describe('Predictions Endpoint testing', () => {
 
    beforeAll(async () => {
        await db('users').truncate();
        await db('campaign').truncate();
        await db('prediction').truncate();

        await request(server)
        .post('/api/auth/register')
        .send({
            username: 'Karma',
				password: 'p4R4d16m',
				avatar: 'yinyang.jpg',
				role: 2,
				first_name: 'Steve',
				last_name: 'Wembleton',
				email: 'Wemby@writeme.me',
        })
        .then(async () => {
            await request(server)
                .post('/api/auth/login')
                .send({username: 'Karma', password: 'p4R4d16m'})
                .then((res) => {
                    token = res.body.token;
                })
        })
        .then(async () => {
            await request(server)
            .post('/api/campaign')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Doom Guy Costume",
                video: "doomgcosplay.mp4",
                desc: "I need to update my cosplay",
                keywords : "cosplay, costume, doom",
                disable_communication: 0,
                country: "US",
                currency: "Dollar",
                goal: 1200,
                campaign_length: 60,
                user_id: 1
            })
        })
    })
    beforeEach(async () => {
        await db('prediction').truncate();
    })

    describe('CRUD a prediction', () => {

        test('Post a prediction', async () => {
            await request(server)
            .post('/api/prediction')
            .set('Authorization', `Bearer ${token}`)
            .send({
                campaign_id: 1,
                success: 0
            })
            .then((res) => expect(res.status).toBe(201))
            .catch((err) => console.log(err));
        })

        test('Update a prediction', async () => {
            await request(server)
            .post('/api/prediction')
            .set('Authorization', `Bearer ${token}`)
            .send({
                campaign_id: 1,
                success: 0
            })
            .then(async () =>
                await request(server)
                .put('/api/prediction/1')
                .set('Authorization', `Bearer ${token}`)
                .send({success: 1})
                )
            .then((res) => expect(res.status).toBe(200))
            .catch((err) => console.log(err));
        })
        test('Delete a prediction', async () => {
            await request(server)
            .post('/api/prediction')
            .set('Authorization', `Bearer ${token}`)
            .send({
                campaign_id: 1,
                success: 1
            })
            .then(async () =>
                await request(server)
                .del('/api/prediction/1')
                .set('Authorization', `Bearer ${token}`)
                )
            .then((res) => expect(res.type).toBe('application/json'))
            .catch((err) => console.log(err));
        })
    })




})