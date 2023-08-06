// logger.js
const winston = require('winston');

const logFormat = winston.format.combine(
    winston.format.timestamp({
      format: 'HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  );
  
  // Create a Winston logger instance
  const logger = winston.createLogger({
    level: 'info', // Set the default log level
    format: logFormat, // Use the custom log format with colorization and timestamp
    transports: [
      new winston.transports.Console() // Log to the console
    ]
  });

module.exports = logger;