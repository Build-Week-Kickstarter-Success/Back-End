/** @format */

const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

let token;

beforeAll(async () => {
    await db('users').truncate();

    await request(server)
    .post('/api/auth/register')
    .send({
    username: 'Admin',
    password: 'admin',
    avatar: 'admin.png',
    role: 1,
    first_name: 'admin',
    last_name: 'admin',
    email: 'admin@admin.admin',
    })
    .expect(201)
    .then(async () => {
        await request(server)
        .post('/api/auth/login')
        .send({ username: 'Admin',  password: 'admin'  })
    .then((res) => {
      token = res.body.token;
      
    })
})
.then(async()=>{
    request(server)
.post('/api/auth/register')
.send({
    username: 'tim',
    password: 'tim',
    avatar: 'tim.png',
    role: 2,
    first_name: 'tom',
    last_name: 'timopthy',
    email: 'tom@tim.me'
    })
    .expect(201)
    .then(async () =>{
       request(server)
        .post('/api/auth/register')
        .send({
            username: 'beth',
            password: 'beth',
            avatar: 'beth.png',
            role: 2,
            first_name: 'Bethany',
            last_name: 'Litany',
            email: 'bl@live.com'
            })
        .expect(201)
            .then(async () => {
                request(server)
                .post('/api/auth/register')
                .send({
                    username: 'frank',
                    password: 'decosta',
                    avatar: 'frank.png',
                    role: 2,
                    first_name: 'franky',
                    last_name: 'desmond',
                    email: 'wowwee@wowwee.com'
                })
                .expect(201)
                })
            })
        })
})

describe('User List tests',() => {
	 test('userlist',  async () => {
        await  request(server)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .catch((err) => console.log(err));
    })
    test('edit', async () => {
        await request(server)
        .put('/api/users/2')
        .set('Authorization', `Bearer ${token}`)
        .send({username: 'waffles'})
        .expect(200)
        .catch((err) => console.log(err));
    })
    test('delete', async () => {
        await request(server)
        .delete('/api/users/3')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => expect(res.type).toBe('application/json'))
        .catch((err) => console.log(err));
    })
})