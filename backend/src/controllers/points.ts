import { Request, Response, response } from "express";
import Knex from "knex";
import log4js from 'log4js';
import logger from '../../src/utils/logger'

class PointsController {
    private database: Knex
    private logger: log4js.Logger

    constructor(database: Knex) {
        this.database = database
        this.logger = logger.getLogger()
    }

    public async create(req: Request, res: Response) {
        const trx = await this.database.transaction()

        try {
            const {
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf,
                items
            } = req.body

            const [insertedPointId] = await trx.from('points').insert({
                image: 'a-fake-image',
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf
            })

            const pointItems: object[] = items.map((itemId: number) => {
                return {
                    item_id: itemId,
                    point_id: insertedPointId
                }
            })

            await trx.from('point_item').insert(pointItems)
            await trx.commit()

            return res.status(201).send({ data: { success: true } })
        } catch (error) {
            this.logger.error(error)
            trx.rollback()

            return res.status(500).send(new Error("aa"))
        }

    }

    public async show(req: Request, res: Response) {
        const { id } = req.params
        try {
            const point = await this.database
                .from('points')
                .where('id', id)
                .first()

            if (!point) {
                return res.status(400).send({ message: 'Point not found' })
            }

            const items = await this.database.from('items')
                .join('point_item', 'items.id', '=', 'point_item.item_id')
                .where('point_item.point_id', id)
                .select('items.title')

            return res.json({ data: { point, items } })

        } catch (error) {
            this.logger.error(error)
            console.error(error)
            res.status(500).send(new Error("Server error"))
        }
    }
}

export default PointsController

