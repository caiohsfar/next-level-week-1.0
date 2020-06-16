import supertest, { SuperTest } from 'supertest'
import database from '../../../src/database/connection'
import app from '../../../src/app'

describe('Routes: points', () => {
    let request: SuperTest<supertest.Test>

    const pointId = 6
    const inexistentPointId = 100
    const pointItemToReturn = {
        point: expect.objectContaining({
            name: expect.any(String),
            email: expect.any(String),
            whatsapp: expect.any(String),
            latitude: expect.any(Number),
            longitude: expect.any(Number),
            city: expect.any(String),
            uf: expect.any(String)
        })
        ,
        items: expect.arrayContaining([
            { title: expect.any(String) }
        ]),
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
                    expect(res.body.data).toBeDefined()
                    done(err)
                })
        })
    })

    describe('GET /points/:id', () => {
        test('Should return a point with its items successfully', done => {
            request.get(`/points/${pointId}`)
                .end((err, res) => {
                    expect(res.status).toBe(200)
                    expect(res.body.data).toMatchObject(
                        expect.objectContaining(pointItemToReturn)
                    )
                    done(err)
                })
        })
        test('Should return 400 when passing a inexistent point id', done => {
            request.get(`/points/${inexistentPointId}`)
                .end((err, res) => {
                    expect(res.status).toBe(400)
                    expect(res.body).toMatchObject(
                        expect.objectContaining({
                            message: "Point not found"
                        })
                    )
                    done(err)
                })
        })
    })
    describe('GET /points', () => {
        test('Should return a list of points', done => {
            request.get(`/points?city=fake-city&uf=uf&items=5,3`)
                .end((err, res) => {
                    expect(res.status).toBe(200)
                    expect(res.body.data).toMatchObject(
                        expect.arrayContaining([pointItemToReturn.point])
                    )
                    done(err)
                })
        })
    })
    

})

