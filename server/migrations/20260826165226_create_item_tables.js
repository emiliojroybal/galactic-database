/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('item_type', table => {
    table.string('id', 12).primary();
    table.string('name').notNullable();
  });

  await knex.schema.createTable('item', table => {
    table.string('id', 12).primary();
    table.string('name').notNullable();
    table.string('typeID', 12).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('item_type');
  await knex.schema.dropTableIfExists('item');
};
