import knex from 'knex'
import knexConfig from '../../knexfile'

let environmentConfig: knex.Config

if (process.env.NODE_ENV === "test") {
    environmentConfig = knexConfig.test
} else if (process.env.NODE_ENV === "development") {
    environmentConfig = knexConfig.development
} else {
    environmentConfig = knexConfig.production
}

const connection: knex = knex(environmentConfig)

export default connection