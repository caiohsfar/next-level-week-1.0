import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from "./routes";
import path from 'path'
import Knex from 'knex';
import connection from '../src/database/connection'
import log4js from 'log4js';

class App {
    public server: express.Application
    public logger: log4js.Logger

    public constructor() {
        this.server = express()
        this.logger = this.setUpAndGetLogger()
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

    private setUpAndGetLogger(): log4js.Logger {
        log4js.configure({
            appenders: { app: { type: "file", filename: "app.log" } },
            categories: { default: { appenders: ["app"], level: "error" } }
        });

        return log4js.getLogger()
    }

}

export default new App()
