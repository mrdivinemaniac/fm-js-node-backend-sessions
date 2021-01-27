const express = require('express')
const router = require('./routes')
// TODO: use process.env + add to config
const port = '3000'

const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static('./public'))

app.use('/', router)

app.listen(port, () => {
   console.log(`Listening on port ${port}`)
})
