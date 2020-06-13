import express from 'express'
import ItemsController from '../controllers/items'
import database from '../../src/database/connection'

const itemsRouter = express.Router()

const itemsController = new ItemsController(database)

itemsRouter.get('/', (req, res) => itemsController.index(req, res))

export default itemsRouter