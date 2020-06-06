import express from 'express'
import itemsController from '../controllers/items'

const itemsRouter = express.Router()

itemsRouter.get('/', itemsController.index)

export default itemsRouter