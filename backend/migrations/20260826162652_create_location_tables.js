/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('location_type', table => {
    table.string('id', 12).primary();
    table.string('name').notNullable();
  });

  await knex.schema.createTable('location', table => {
    table.string('id', 12).primary();
    table.string('name').notNullable();
    table.string('locationType', 12).notNullable();
    table.float('locationX').notNullable().defaultTo(0);
    table.float('locationY').notNullable().defaultTo(0);
    table.string('controllingFactionID', 12).notNullable();
    table.string('resourceIDs');
    table.text('image');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('location_type');
  await knex.schema.dropTableIfExists('location');
};
