const { format } = require('winston')
const winston = require('winston')

winston.addColors({
	info: 'bold blue',
	statement: 'italic yellow',
	error: 'bold red',
	debug: 'green'
})

function createLogger (label) {
	const logger = winston.createLogger({
		transports: [
      new winston.transports.Console({
        level: 'silly',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize({ all: true }),
          winston.format.simple(),
          winston.format.label({ label }),
          winston.format.printf(info => `${info.label}: ${info.timestamp} ${info.message}`)
        )
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
        level: 'silly',
        format: winston.format.combine(
          winston.format.label({ label }),
          winston.format.json()
        )
      })
    ]
	})
  return logger
}

module.exports = {
  createLogger
}
