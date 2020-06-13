import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from "./routes";
import path from 'path'

class App {
    public server: express.Application
    public constructor() {
        this.server = express()
        this.setupMiddlewares()
        this.setupRoutes()
    }

    private setupMiddlewares(): void {
        this.server.use(cors())
        this.server.use(bodyParser.urlencoded({ extended: false }))
        this.server.use(bodyParser.json())
    }

    private setupRoutes(): void {
        this.server.use(routes)
        this.server.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    }
}

export default new App()
