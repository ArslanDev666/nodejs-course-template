const { createLogger, format, transports } = require('winston');
const { printf, timestamp } = format;

const myFormat = printf(({ message, timestamp: time }) => {
  return `${time} - ${message.toString()}`;
});

const logger = new createLogger({
  format: format.combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    myFormat
  ),
  transports: [
    new transports.File({
      level: 'info',
      filename: './logs/info.log',
      handleExceptions: false,
      timestamp: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new transports.File({
      filename: './logs/errors.log',
      level: 'error',
      handleExceptions: true,
      json: true,
      timestamp: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

logger.stream = {
  write: message => {
    logger.info(message);
  }
};

module.exports = logger;
