const config = require('./jest.config.js')
config.testMatch = ['<rootDir>/test/integration/**/*.spec.ts']
config.automock = false
module.exports = config