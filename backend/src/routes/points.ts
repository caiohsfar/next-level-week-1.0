import express from 'express'
import PointsController from '../controllers/points'
import database from '../database/connection'

const pointsRouter = express.Router()

const pointsController = new PointsController(database)
pointsRouter.post('/', (req, res) => pointsController.create(req, res))
pointsRouter.get('/:id', (req, res) => pointsController.show(req, res))

export default pointsRouter