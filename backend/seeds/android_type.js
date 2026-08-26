const { generateID } = require('../functions.js');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('android_type').del()
  await knex('android_type').insert([
    {id: generateID("TAND"), name: 'Builder'},
    {id: generateID("TAND"), name: 'Operator'},
    {id: generateID("TAND"), name: 'Combat'}
  ]);
};
