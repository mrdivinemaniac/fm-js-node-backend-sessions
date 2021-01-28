const express = require('express')
const router = require('./routes')
const config = require('./config')

const app = express()

// NOTE: 
// there are MANY VIEW/TEMPLATE ENGINES. Example: handlebars, mustache, jade.
// We are using ejs because everyone is 
// Frontend so will most likely not use template engines much. So, no much focus
// Template engines are SUPPORTED INTERNALLY by express.
// We set these APPLICATION SETTINGS to tell where views are located
// and which template engine to use
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// NOTE: Application Middleware
// Intercepts requests to see if they request files from /public
// If yes, serves them. No other routes are run
app.use(express.static('./public'))

// NOTE: Route Middleware
app.use('/', router)

app.listen(config.PORT, () => {
   console.log(`Listening on port ${config.PORT}`)
})
