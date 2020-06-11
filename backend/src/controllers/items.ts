import { Request, Response } from "express";
import app from "../app";

class ItemsController {
    public async index(req: Request, res: Response) {
        try {
            const items = await app.database.select('*').from('items')

            const serializedItems = items.map(item => {
                return {
                    title: item.title,
                    image_url: `http://localhost:3333/uploads/${item.image}`
                }
            })

            return res.send({ data: serializedItems })
        } catch (error) {
            app.logger.error(error)
            res.status(500).send(new Error("Could not get Items."))
        }

    }
}

export default new ItemsController()