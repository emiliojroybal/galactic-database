const { generateID } = require('../functions.js');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ship_system_type').del()
  await knex('ship_system_type').insert([
    {id: generateID("TSYS"), name: 'engines'},
    {id: generateID("TSYS"), name: 'shields'},
    {id: generateID("TSYS"), name: 'reactor'},
    {id: generateID("TSYS"), name: 'sensors'},
    {id: generateID("TSYS"), name: 'navigation'},
    {id: generateID("TSYS"), name: 'weapons'},
  ]);
};
