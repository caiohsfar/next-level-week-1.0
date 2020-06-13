import log4js from 'log4js';
const filename = process.env.NODE_ENV === "test" ? "app.test.log" : 'app.log'

export default log4js.configure({
    appenders: { app: { type: "file", filename } },
    categories: { default: { appenders: ["app"], level: "error" } }
})

