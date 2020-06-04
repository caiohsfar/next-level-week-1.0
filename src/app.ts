import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from "./routes";

class App {
    public express: express.Application

    public constructor() {
        this.express = express()
        this.setupMiddlewares()
        this.setupRoutes()
    }

    private setupMiddlewares(): void {
        this.express.use(cors())
        this.express.use(bodyParser.urlencoded({ extended: false }))
        this.express.use(bodyParser.json())
    }

    private setupRoutes(): void {
        this.express.use(routes)
    }
}

export default new App().express
