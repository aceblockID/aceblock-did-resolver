const winston = require("winston");

var path = require("path");
const logFilePath = __dirname + "/logs";


const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYY-MM-DD HH:mm:ss" }),
        winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message} `
        )
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(logFilePath, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logFilePath, 'info.log'), level: 'info' })
    ]
});

module.exports = logger;
