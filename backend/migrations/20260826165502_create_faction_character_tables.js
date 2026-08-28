/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('faction', table => {
    table.string('id', 12).primary();
    table.string('name').notNullable();
    table.string('allyFactionIDs');
    table.string('enemyFactionIDs');
    table.text('image');
  });

  await knex.schema.createTable('species', table => {
    table.string('id', 12).primary();
    table.string('name').notNullable();
    table.text('image');
  });

  await knex.schema.createTable('character', table => {
    table.string('id', 12).primary();
    table.string('name').notNullable();
    table.string('factionIDs');
    table.string('speciesID').notNullable();
    table.text('image');
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('faction');
  await knex.schema.dropTableIfExists('species');
  await knex.schema.dropTableIfExists('character');
};
