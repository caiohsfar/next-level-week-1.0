import { Request, Response } from "express";
import Knex from "knex";

class PointsController {
    private database: Knex

    constructor(database: Knex) {
        this.database = database
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
            //app.logger.error(error)
            trx.rollback()

            return res.status(500).send(new Error("aa"))
        }

    }

    public async show(req: Request, res: Response) {
    }
}

export default PointsController

