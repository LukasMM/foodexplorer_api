exports.up = knex => knex.schema.createTable('ingredients', table => {
  table.increments('id').primary()
  table
    .integer('dish_id')
    .references('id')
    .inTable('dishes')
    .onDelete('CASCADE')
  table.text('name').notNullable()
    
  table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  table.timestamp('updated_at').defaultTo(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('ingredients')