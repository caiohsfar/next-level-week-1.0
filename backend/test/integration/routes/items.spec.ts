import supertest, { SuperTest } from 'supertest'
import app from '../../../src/app'
import database from '../../../src/database/connection'

describe('Routes: items', () => {
    let request: SuperTest<supertest.Test>

    beforeAll(async () => {
        request = supertest(app.server)
        await database.migrate.rollback()
        await database.migrate.latest()
    })

    beforeEach(async () => {
        await database('items').truncate()
        await database.seed.run()
    })

    afterEach(async () => {
        await database.migrate.rollback()
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

