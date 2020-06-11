import express from 'express'
import rootRouter from './root'
import itemsRouter from './items'
import pointsRouter from './points'

const router: express.Router = express.Router()

router.use('/', rootRouter)
router.use('/items', itemsRouter)
router.use('/points', pointsRouter)

export default router

