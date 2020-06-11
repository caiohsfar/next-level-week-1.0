import express from 'express'
import pointsController from '../controllers/points'

const pointsRouter = express.Router()


pointsRouter.post('/', pointsController.create)

export default pointsRouter