const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

if (!fs.existsSync('logs')) fs.mkdirSync('logs');

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: path.join('logs', 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join('logs', 'combined.log') }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({ format: format.simple() }));
}

logger.stream = {
  write: (message) => logger.info(message.trim()),
};

module.exports = logger;
