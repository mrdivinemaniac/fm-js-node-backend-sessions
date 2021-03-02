const { DB_URL } = require('./config')

module.exports = {
  client: 'pg',
  connection: DB_URL,
  pool: { min: 1, max: 7 }
}
