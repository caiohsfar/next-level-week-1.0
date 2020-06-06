import express, { Router } from 'express'
import rootRouter from './root'
import itemsRouter from './items'

const router: Router = Router()
router.use('/', rootRouter)
router.use('/items', itemsRouter)

export default router

