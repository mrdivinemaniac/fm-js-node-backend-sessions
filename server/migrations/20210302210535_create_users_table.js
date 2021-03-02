exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
    t.uuid('id').primary()
    t.string('email').notNullable().unique()
    t.string('username').notNullable().unique()
    t.string('password_hash').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
