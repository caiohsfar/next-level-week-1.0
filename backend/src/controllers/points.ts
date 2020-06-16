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
    public async index(req: Request, res: Response) {
        const { query: { city, uf, items } } = req
        try {
            const parsedItems = String(items).split(',').map(item => Number(item.trim()))

            const points = await this.database.from('points')
                .join('point_item', 'points.id', '=', 'point_item.point_id')
                .whereIn('point_item.item_id', parsedItems)
                .where('city', String(city))
                .where('uf', String(uf))
                .distinct()
                .select('points.*')

            
            return res.status(200).send({ data: points })

        } catch (error) {
            this.logger.error(error)
            return res.status(400).send(new Error('Cannot find points with passed params'))
        }

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

            const point = {
                image: 'a-fake-image',
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf
            }

            const [insertedPointId] = await trx.from('points').insert(point)

            const pointItems: object[] = items.map((itemId: number) => {
                return {
                    item_id: itemId,
                    point_id: insertedPointId
                }
            })

            await trx.from('point_item').insert(pointItems)
            await trx.commit()

            return res.status(201).send({ data: { id: insertedPointId, ...point } })
        } catch (error) {
            this.logger.error(error)
            trx.rollback()

            return res.status(500).send(new Error("Server Error"))
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
            res.status(500).send(new Error("Server error"))
        }
    }

}

export default PointsController

