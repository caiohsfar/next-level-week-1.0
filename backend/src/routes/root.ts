import express from 'express'
import rootController from '../controllers/root'

const rootRouter = express.Router()

rootRouter.get('/', rootController.index)

export default rootRouter