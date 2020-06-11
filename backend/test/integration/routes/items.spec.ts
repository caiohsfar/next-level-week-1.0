import supertest, { SuperTest } from 'supertest'
import app from '../../../src/app'

describe('Routes: items', () => {
    let request: SuperTest<supertest.Test>

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

    describe('GET /items', () => {
        test('Should return an array of items', done => {
            request.get('/items')
                .end((err, res) => {
                    expect(res.status).toBe(200)
                    expect(res.body.data).toBeDefined()
                    done(err)
                })
        })
    })
})

