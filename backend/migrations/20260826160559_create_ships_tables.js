/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('ship_system_type', table => {
    table.string('id', 12).primary();
    table.string('name').notNullable();
  });

  await knex.schema.createTable('ship_system', table => {
    table.string('id', 12).primary();
    table.string('name').notNullable();
    table.integer('efficiency');
    table.integer('baseHealth');
    table.string('typeID', 12).notNullable();
  });

  await knex.schema.createTable('ship_type', table => {
    table.string('id', 12).primary();
    table.string('name').notNullable();
  })

  await knex.schema.createTable('ship', table => {
    table.string('id', 12).primary();
    table.string('name').notNullable();
    table.string('typeID', 12).notNullable();
    table.string('initialSystemIDs').notNullable();
    table.string('controllingFactionID', 12).notNullable();
    table.integer('baseIntegrity');
    table.integer('systemSlots');
    table.float('initialLocationX');
    table.float('initialLocationY');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('ship_system_type');
  await knex.schema.dropTableIfExists('ship_system');
  await knex.schema.dropTableIfExists('ship_type');
  await knex.schema.dropTableIfExists('ship');
};
