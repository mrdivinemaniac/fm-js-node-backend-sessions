const knex = require('knex')
const knexConfig = require('./knexfile')

const dbClient = knex(knexConfig)

module.exports = {
  dbClient
}
