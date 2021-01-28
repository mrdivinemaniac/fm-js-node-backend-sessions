const path = require('path')

module.exports = {
  PORT: process.env.PORT || 3000,
  PUBLIC_PATH: path.join(__dirname, '../public')
}
