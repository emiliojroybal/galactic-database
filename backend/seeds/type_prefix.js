/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('type_prefix').del()
  await knex('type_prefix').insert([
    {type: 'ship_system_type', prefix: 'TSYS'},
    {type: 'ship_system', prefix: 'ISYS'},
    {type: 'ship_type', prefix: 'TSHP'},
    {type: 'ship', prefix: 'ISHP'},
    {type: 'android_type', prefix: 'TAND'},
    {type: 'android', prefix: 'IAND'},
    {type: 'location_type', prefix: 'TLOC'},
    {type: 'location', prefix: 'ILOC'},
    {type: 'item_type', prefix: 'TITM'},
    {type: 'item', prefix: 'IITM'},
    {type: 'faction', prefix: 'IFAC'},
    {type: 'species', prefix: 'ISPC'},
    {type: 'character', prefix: 'ICHR'},
  ]);
};
