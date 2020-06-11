import supertest, { SuperTest } from 'supertest'
import app from '../../../src/app'

describe('Routes: points', () => {
    let request: SuperTest<supertest.Test>

    const requestBody = {
        name: "A point",
        email: "A email",
        whatsapp: "valid-number",
        latitude: 81.22323,
        longitude: 81.22222,
        city: "a city",
        uf: "a city",
        items: [1, 2]
    }

    beforeAll(() => {
        request = supertest(app.server)
    })

    beforeEach(async () => {
        await app.database.migrate.rollback()
        await app.database.migrate.latest()
        await app.database.seed.run()
    })

    afterEach(async () => {
        await app.database.migrate.rollback()
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
})

