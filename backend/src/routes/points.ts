import express from 'express'
import PointsController from '../controllers/points'
import database from '../database/connection'

const pointsRouter = express.Router()

const pointsController = new PointsController(database)
pointsRouter.get('/', (req, res) => pointsController.index(req, res))
pointsRouter.get('/:id', (req, res) => pointsController.show(req, res))
pointsRouter.post('/', (req, res) => pointsController.create(req, res))

export default pointsRouter