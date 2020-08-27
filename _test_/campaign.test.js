const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbConfig');
const { testing } = require('../knexfile');


let token;

describe('Campaign Endpoint testing', () => {
 
    beforeAll(async () => {
        await db('users').truncate();
        request(server)
        .post('/api/auth/register')
        .send({
            username: 'Renegade',
				password: 'R3n364d3',
				avatar: 'martin.jpg',
				role: 1,
				first_name: 'Martin',
				last_name: 'Short',
				email: 'm.short@renegade.com',
        })
        .then(async () => {
            await request(server)
                .post('/api/auth/login')
                .send({username: 'Renegade', password: 'R3n364d3'})
                .then((res) => {
                    token = res.body.token;
                })
        })
    })
    beforeEach(async () => {
        await db('campaign').truncate();
    })

    describe('CRUD a campaign', () => {

        test('Post a campaign', async () => {
            await request(server)
            .post('/api/campaign')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "waffles",
                video: "longvideocampaign.mp4",
                desc: "Making waffles for the first time.",
                keywords : "Waffles",
                disable_communication: 0,
                country: "US",
                currency: "Dollar",
                goal: 1200,
                campaign_length: 60,
                user_id: 1
            })
            .then((res) => expect(res.status).toBe(201))
            .catch((err) => console.log(err));
        })

        test('Update a campaign', async () => {
            await request(server)
            .post('/api/campaign')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Taco Salad",
                video: "video.mvi",
                desc: "tco",
                keywords : "Taco",
                disable_communication: 0,
                country: "US",
                currency: "Dollar",
                goal: 800,
                campaign_length: 90,
                user_id: 1
            })
            .then(async () =>
                await request(server)
                .put('/api/campaign/1')
                .set('Authorization', `Bearer ${token}`)
                .send({desc:'Making a Taco Salad'})
                )
            .then((res) => expect(res.status).toBe(200))
            .catch((err) => console.log(err));
        })
        test('Delete a campaign', async () => {
            await request(server)
            .post('/api/campaign')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "one",
                video: "two",
                desc: "three",
                keywords : "four",
                disable_communication: 0,
                country: "US",
                currency: "Dollar",
                goal: 5,
                campaign_length: 6,
                user_id: 1
            })
            .then(async () =>
                await request(server)
                .del('/api/campaign/1')
                )
            .then((res) => expect(res.type).toBe('application/json'))
            .catch((err) => console.log(err));
        })
    })




})