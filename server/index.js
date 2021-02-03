const bodyParser = require('body-parser')
const express = require('express')
const config = require('./config')
const routes = require('./routes')
// const bodyParser = require('body-parser')

const app = express()

// express json support from version 4.16.0
app.use(express.json())

// using body parser
// app.use(bodyParser.json())

app.use('/', routes)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
