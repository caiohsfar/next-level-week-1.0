import sinon from 'sinon'
import app from '../../../src/app'
import PointsController from '../../../src/controllers/points'
import { Request, Response } from 'express'
import knexMock from '../../../src/database/mocks/knex'
import Sinon from 'sinon'
import Knex from 'knex'

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

    const fakePoint = { ...newPointBody, image: 'a-fake-image' }
    delete fakePoint.items

    const fakePointItems = [
        {
            item_id: 2,
            point_id: 1
        }
    ]
    const fakeItem = {
        id: 1,
        image: 'image',
        title: 'title'
    }
    const fakeItemArray = [
        fakeItem
    ]

    describe('create()', () => {
        it('Should create an point', async () => {
            const request = { body: newPointBody } as Request

            const dbMock: Sinon.SinonMock = sinon.mock(knexMock)

            // transaction

            defaultResponse.status.withArgs(201).returnsThis()

            dbMock.expects('transaction').once().resolvesThis()

            // insert point
            dbMock.expects('from').once().withArgs('points').returnsThis()
            dbMock.expects('insert').once().withArgs(fakePoint).resolves([1])

            // insert point_item
            dbMock.expects('from').once().withArgs('point_item').returnsThis()
            dbMock.expects('insert').withArgs(fakePointItems).resolves()

            // commit transaction
            dbMock.expects('commit').resolves()
            // Atribuir comportamento ao stub
            defaultResponse.status.withArgs(201).returnsThis()

            const pointsController = new PointsController(knexMock as unknown as Knex)
            await pointsController.create(request, defaultResponse as unknown as Response)

            dbMock.verify()

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

            const dbMock: Sinon.SinonMock = sinon.mock(knexMock)

            dbMock.expects('transaction').once().resolvesThis()

            dbMock.expects('from').once().withArgs('points').returnsThis()
            dbMock.expects('insert').once().withArgs().rejects()



            dbMock.expects('rollback').once().resolves()

            const pointsController = new PointsController(knexMock as unknown as Knex)
            await pointsController.create(request, defaultResponse as unknown as Response)
            dbMock.verify()

            sinon.assert.calledWith(defaultResponse.status, 500)
            expect(defaultResponse.send).toHaveBeenCalledWith(
                expect.objectContaining({ message: expect.any(String) })
            )
        });
    })

    describe('show()', () => {
        it('Should return a point and its items passing an point id', async () => {
            const pointId = 1
            const request = { params: { id: pointId } } as unknown as Request
            const dbMock: Sinon.SinonMock = sinon.mock(knexMock)


            const response = {
                json: jest.fn(),
                status: jest.fn()
            }
            // resgatar o point
            dbMock.expects('from').once().withArgs('points').returnsThis()
            dbMock.expects('where').once().withArgs('id', pointId).returnsThis()
            dbMock.expects('first').once().resolves(fakePoint)

            dbMock.expects('from').once().withArgs('items').returnsThis()
            dbMock.expects('join')
                .once()
                .withArgs(
                    'point_item',
                    'items.id',
                    '=',
                    'point_item.item_id'
                )
                .returnsThis()

            dbMock.expects('where').once().withArgs('point_item.point_id', pointId).returnsThis()
            dbMock.expects('select').once().withArgs('items.title').resolves(fakeItemArray)

            const pointsController = new PointsController(knexMock as unknown as Knex)
            await pointsController.show(request as Request, response as unknown as Response)

            dbMock.verify()
            expect(response.json).toBeCalledWith(
                expect.objectContaining({
                    data: expect.objectContaining({
                        point: expect.objectContaining(fakePoint),
                        items: expect.arrayContaining(fakeItemArray)
                    })
                }))
        })
    })

})
