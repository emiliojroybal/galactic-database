const { generateID } = require('../functions.js');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ship_type').del()
  await knex('ship_type').insert([
    {id: generateID("TSHP"), name: 'shuttle'},
    {id: generateID("TSHP"), name: 'cruiser'},
    {id: generateID("TSHP"), name: 'frigate'}
  ]);
};
