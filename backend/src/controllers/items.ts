import { Request, Response } from "express";
import log4js from 'log4js';
import logger from '../../src/utils/logger'
import Knex from "knex";

export default class ItemsController {
    private database: Knex
    private logger: log4js.Logger

    constructor(database: Knex) {
        this.database = database
        this.logger = logger.getLogger()
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
            this.logger.error(error)
            res.status(500).send(new Error("Could not get Items."))
        }

    }
}
