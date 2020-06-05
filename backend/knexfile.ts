// Update with your config settings.
import path from 'path'

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'dev.sqlite')
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'test.sqlite'),
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
  },
  staging: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true

  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
  }
};

let configToExport: Object

if (process.env.NODE_ENV === "test") {
  configToExport = config.test
} else if (process.env.NODE_ENV === "development") {
  configToExport = config.development
} else {
  configToExport = config.production
}

module.exports = configToExport