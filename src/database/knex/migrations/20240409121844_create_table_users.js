exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id').primary()
  table.text('name').notNullable()
  table.text('email').notNullable()
  table.text('password').notNullable()
  table.boolean('admin').default(false)

  table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  table.timestamp('updated_at').defaultTo(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('users')