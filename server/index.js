const express = require('express')
const config = require('./config')
const routes = require('./routes')
const { createLogger } = require('./logger')

const logger = createLogger('index')

const app = express()

app.use('/', routes)

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Unknown error occurred' })
})

const server = app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

process.on('uncaughtException', err => {
  logger.error('Uncaught Exception!', err)
  process.exit(1)
})

process.on('unhandledRejection', err => {
  logger.error('Unhandled Rejection!', err)
  process.exit(1)
})
