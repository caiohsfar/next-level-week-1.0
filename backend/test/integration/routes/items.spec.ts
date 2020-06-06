import connection from '../../../src/database/connection'
import supertest, { SuperTest } from 'supertest'
import app from '../../../src/app'

describe('Routes: items', () => {
    let request: SuperTest<supertest.Test>

    beforeAll(() => {
        request = supertest(app)
    })

    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
        await connection.seed.run()
    })

    afterEach(async () => {
        await connection.migrate.rollback()
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

