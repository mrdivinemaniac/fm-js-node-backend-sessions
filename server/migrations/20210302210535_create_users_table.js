exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
    t.uuid('id')
    t.string('email').notNullable().unique()
    t.string('password_hash').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
