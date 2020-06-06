import { Request, Response, response } from "express";
import knex from '../../src/database/connection'

class ItemsController {
    public async index(req: Request, res: Response) {
        try {
            const items = await knex.select('*').from('items')

            const serializedItems = items.map(item => {
                return {
                    title: item.title,
                    image_url: `http://localhost:3333/uploads/${item.image}`
                }
            })

            return res.send({ data: serializedItems })
        } catch (error) {
            console.error(error)
        }

    }
}

export default new ItemsController()