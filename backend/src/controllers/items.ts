import { Request, Response } from "express";
//import app from "../app";
import Knex from "knex";

export default class ItemsController {
    private database: Knex

    constructor(database: Knex) {
        this.database = database
    }

    public async index(req: Request, res: Response) {
        try {
            const items = await this.database.select('*').from('items')
            const serializedItems = items.map(item => {
                return {
                    title: item.title,
                    image_url: `http://localhost:3000/uploads/${item.image}`
                }
            })

            return res.send({ data: serializedItems })
        } catch (error) {
            //app.logger.error(error)
            res.status(500).send(new Error("Could not get Items."))
        }

    }
}
