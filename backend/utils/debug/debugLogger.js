const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const debugFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const debugLogger = createLogger({
  level: 'debug',
  format: combine(
    colorize(),
    timestamp(),
    debugFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/debug.log', level: 'debug' })
  ]
});

module.exports = debugLogger;
