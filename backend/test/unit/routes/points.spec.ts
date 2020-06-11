import sinon from 'sinon'
import app from '../../../src/app'
import pointsController from '../../../src/controllers/points'
import { Request, Response, response } from 'express'
import Sinon from 'sinon'

describe('Controller: Points', () => {
    const defaultRequest = {
        params: {

        },
        body: {}
    } as Request

    const defaultResponse = {
        send: jest.fn(),
        status: sinon.stub()
    }

    const newPointBody = {
        name: "a-point",
        email: 'a-email@gmail.com',
        whatsapp: '92929292',
        latitude: 1292921.222,
        longitude: 211222.211,
        city: 'Recife',
        uf: 'PE',
        items: [2]
    }
    const fakePointItems = [
        {
            item_id: 2,
            point_id: 1
        }
    ]

    describe('create()', () => {
        it('Should create an point', async () => {
            const request = { body: newPointBody } as Request
            const dbMock: Sinon.SinonMock = sinon.mock(app.database)

            const finalPointToInsert = { ...newPointBody, image: 'a-fake-image' }
            delete finalPointToInsert.items

            // transaction

            defaultResponse.status.withArgs(201).returnsThis()

            dbMock.expects('transaction').returnsThis()

            // insert point
            dbMock.expects('from').once().withArgs('points').returnsThis()
            dbMock.expects('insert').once().withArgs(finalPointToInsert).resolves([1])

            // insert point_item
            dbMock.expects('from').once().withArgs('point_item').returnsThis()
            dbMock.expects('insert').withArgs(fakePointItems).resolves()

            // commit transaction
            dbMock.expects('commit').resolves()
            // Atribuir comportamento ao stub
            defaultResponse.status.withArgs(201).returnsThis()

            await pointsController.create(request, defaultResponse as unknown as Response)

            dbMock.verify()
            dbMock.restore()

            sinon.assert.calledWith(defaultResponse.status, 201)
            expect(defaultResponse.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    data: expect.objectContaining({
                        success: true
                    })
                })
            )
        })
        it('should return 500 as status code and an error message', async () => {
            const request = { body: newPointBody } as Request
            defaultResponse.status.withArgs(500).returnsThis()

            const dbMock: Sinon.SinonMock = sinon.mock(app.database)

            dbMock.expects('transaction').once().resolvesThis()

            dbMock.expects('from').once().withArgs('points').returnsThis()
            dbMock.expects('insert').once().withArgs().rejects()



            dbMock.expects('rollback').once().resolves()

            await pointsController.create(request, defaultResponse as unknown as Response)

            dbMock.verify()
            dbMock.restore()

            sinon.assert.calledWith(defaultResponse.status, 500)
            expect(defaultResponse.send).toHaveBeenCalledWith(
                expect.objectContaining({ message: expect.any(String) })
            )
        });
    })
})
