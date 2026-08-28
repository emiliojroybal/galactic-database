/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('android_type', table => {
    table.string('id', 12).primary();
    table.string('name').notNullable();
  });

  await knex.schema.createTable('android', table => {
    table.string('id', 12).primary();
    table.string('name').notNullable();
    table.string('typeID', 12).notNullable();
    table.integer('baseEfficiency').notNullable();
    table.integer('baseHealth').notNullable();
    table.text('image');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('android_type');
  await knex.schema.dropTableIfExists('android');
};
