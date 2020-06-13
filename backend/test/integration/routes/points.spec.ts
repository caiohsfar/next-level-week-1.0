import supertest, { SuperTest } from 'supertest'
import database from '../../../src/database/connection'
import app from '../../../src/app'

describe('Routes: points', () => {
    let request: SuperTest<supertest.Test>

    const pointId = 6
    const pointToReturn = {
        point: expect.any(Object)
        ,
        item: expect.objectContaining({
            title: expect.any(String),
            image: expect.any(String)
        }),
    }
    const requestBody = {
        name: "A test point",
        email: "A email",
        whatsapp: "valid-number",
        latitude: 81.22323,
        longitude: 81.22222,
        city: "a city",
        uf: "a city",
        items: [1, 2]
    }

    beforeAll(async () => {
        request = supertest(app.server)
        await database.migrate.rollback()
        await database.migrate.latest()
    })

    beforeEach(async () => {
        await database('points').truncate()
        await database.seed.run()
    })

    afterAll(async () => {
        await database.migrate.rollback()
    })

    describe('POST /points', () => {
        test('Should create a point successfully', done => {
            request.post('/points')
                .send(requestBody)
                .end((err, res) => {
                    expect(res.status).toBe(201)
                    expect(res.body.data.success).toBeTruthy()
                    done(err)
                })
        })
    })

    describe('GET /points/:id', () => {
        test('Should return a point with its items successfully', done => {
            request.get(`/points/${pointId}`)
                .end((err, res) => {
                    expect(res.status).toBe(201)
                    expect(res.body.data)
                        .toMatchObject(
                            expect.objectContaining(pointToReturn))
                    done(err)
                })
        })
    })
})

