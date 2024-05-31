exports.up = knex => knex.schema.createTable('dishes', table => {
  table.increments('id').primary()
  table.integer('user_id').references('id').inTable('users')
  table.text('name').notNullable()
  table.text('img')
  table.text('type').notNullable()
  table.float('price').notNullable()
  table.text('description')
    
  table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  table.timestamp('updated_at').defaultTo(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('dishes')