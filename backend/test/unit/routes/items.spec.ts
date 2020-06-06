import sinon from 'sinon'
import knex from '../../../src/database/connection'
import itemsController from '../../../src/controllers/items'
import { Request, Response } from 'express'
describe('Controller: Items', () => {
    const knexMock = sinon.mock(knex)
    const defaultRequest = {
        params: {

        }
    } as Request

    const itemsArray = [{
        title: "a-title",
        image_url: 'a-url'
    }]
    describe('index()', () => {
        it('Should return an array of items', async () => {
            const response = {
                send: jest.fn()
            } as unknown as Response

            knexMock.expects('select').once().withArgs('*').returnsThis()
            knexMock.expects('from').once().withArgs('items').resolves(itemsArray)

            await itemsController.index(defaultRequest, response)
            expect(response.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    data: expect.arrayContaining([{
                        title: expect.any(String),
                        image_url: expect.any(String)
                    }])
                })
            )
        })
    })

})
