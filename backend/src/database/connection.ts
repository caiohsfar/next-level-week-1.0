import knex from 'knex'
const knexConfig = require('../../knexfile')

const connection: knex = knex(knexConfig)

export default connection