const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const traceFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const requestTracer = createLogger({
  level: 'trace',
  format: combine(
    colorize(),
    timestamp(),
    traceFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/trace.log', level: 'trace' })
  ]
});

module.exports = requestTracer;
