
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_scores', function(table){
    table.increments();
    table.integer('user_id').references('user_id').inTable('zombie_users').notNullable();
    table.integer('score');
    table.timestamp('scored_on').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_scores');
};
