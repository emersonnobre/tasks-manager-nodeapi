const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/User')

jest.setTimeout(10000)
beforeEach((done) => {
    User.deleteMany()
    .then(() => done())
    .catch((err) => {
        console.log(err)
        done()
    })
})

afterAll(() => {
    mongoose.connection.close()
})

test('Should create a new user', async () => {
    const response = await request(app)
        .post('/api/v1/user/signup')
        .send({
            user: {
                name: 'guest',
                email: 'guest@guest.com',
                password: 'guest1234'
            }
        })

    expect(response.status).toBe(201)
    expect(response.body.data.token).toBeDefined()
})

test('Should not create a new user with bad request', async () => {
    const response = await request(app)
        .post('/api/v1/user/signup')
        .send({
            user: {
                name: '',
                email: '',
                password: ''
            }
        })
        
    expect(response.status).toBe(400)
    expect(response.body.error).toHaveLength(3)
})