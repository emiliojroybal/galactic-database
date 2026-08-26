const { generateID } = require('../functions.js');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item_type').del()
  await knex('item_type').insert([
    {id: generateID("TITM"), name: 'weapon'},
    {id: generateID("TITM"), name: 'resource'},
    {id: generateID("TITM"), name: 'junk'}
  ]);
};
