const config = require('./jest.config.js')
config.testMatch = ['<rootDir>/test/integration/**/*.spec.ts']
module.exports = config