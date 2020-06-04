import express, { Router } from 'express'
import rootRouter from './root'

const router: Router = Router()
router.use('/', rootRouter)

export default router

