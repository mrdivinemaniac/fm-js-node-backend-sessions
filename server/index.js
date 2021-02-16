const express = require('express')
const config = require('./config')
const routes = require('./routes')

const app = express()

app.use('/', routes)

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Unknown error occurred' })
})

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
