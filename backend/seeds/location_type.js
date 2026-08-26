const { generateID } = require('../functions.js');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('location_type').del()
  await knex('location_type').insert([
    {id: generateID("TLOC"), name: 'planet'},
    {id: generateID("TLOC"), name: 'asteroid'},
    {id: generateID("TLOC"), name: 'nebula'},
    {id: generateID("TLOC"), name: 'star'},
    {id: generateID("TLOC"), name: 'station'},
  ]);
};
