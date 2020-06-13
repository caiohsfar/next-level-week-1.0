import sinon from 'sinon'
import ItemsController from '../../../src/controllers/items'
import { Request, Response } from 'express'
import knexMock from '../../../src/database/mocks/knex'
import Knex from 'knex'

describe('Controller: Items', () => {
    const defaultRequest = {
        params: {

        }
    } as Request

    const defaultResponse = {
        send: jest.fn(),
        status: sinon.stub()
    }

    const itemsDbArray = [{
        id: 1,
        title: "a-title",
        image_url: 'a-url'
    }]

    describe('index()', () => {
        it('Should return an array of items', async () => {
            const dbMock = sinon.mock(knexMock)
            dbMock.expects('select').once().withArgs('*').returnsThis()
            dbMock.expects('from').once().withArgs('items').resolves(itemsDbArray)

            const itemsController = new ItemsController(knexMock as unknown as Knex)
            await itemsController.index(defaultRequest, defaultResponse as unknown as Response)

            dbMock.verify()
            expect(defaultResponse.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    data: expect.arrayContaining([{
                        title: expect.any(String),
                        image_url: expect.any(String)
                    }])
                })
            )
        })

        describe('when throw an error', () => {
            it('should return 500 as status code and an error message', async () => {
                const dbMock = sinon.mock(knexMock)

                defaultResponse.status.withArgs(500).returnsThis()
                dbMock.expects('select').once().withArgs('*').returnsThis()
                dbMock.expects('from').once().withArgs('items').rejects(new Error('Could not get items'))

                const itemsController = new ItemsController(knexMock as unknown as Knex)
                await itemsController.index(defaultRequest, defaultResponse as unknown as Response)

                dbMock.verify()

                sinon.assert.calledWith(defaultResponse.status, 500)
                expect(defaultResponse.send).toHaveBeenCalledWith(
                    expect.objectContaining({ message: expect.any(String) })
                )
            })
        })
    })

})
