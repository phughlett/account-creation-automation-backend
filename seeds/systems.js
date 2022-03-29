/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('systems').del()
  await knex('systems').insert([
    {system_name: 'System 1', iao_name:'Devin Bradfield', iao_email:'devin@gmail.com', sec_man_name:'Patrick Hughlett', sec_man_email:'patrick@gmail.com',sys_ad_name:'Michael Bloom', sys_ad_email:'michael@gmail.com'},
    {system_name: 'System 2', iao_name:'Devin Bradfield', iao_email:'devin@gmail.com', sec_man_name:'Patrick Hughlett', sec_man_email:'patrick@gmail.com',sys_ad_name:'Michael Bloom', sys_ad_email:'michael@gmail.com'},
    {system_name: 'System 3', iao_name:'Devin Bradfield', iao_email:'devin@gmail.com', sec_man_name:'Patrick Hughlett', sec_man_email:'patrick@gmail.com',sys_ad_name:'Michael Bloom', sys_ad_email:'michael@gmail.com'},
    {system_name: 'System 4', iao_name:'Devin Bradfield', iao_email:'devin@gmail.com', sec_man_name:'Patrick Hughlett', sec_man_email:'patrick@gmail.com',sys_ad_name:'Michael Bloom', sys_ad_email:'michael@gmail.com'},
    {system_name: 'System 5', iao_name:'Devin Bradfield', iao_email:'devin@gmail.com', sec_man_name:'Patrick Hughlett', sec_man_email:'patrick@gmail.com',sys_ad_name:'Michael Bloom', sys_ad_email:'michael@gmail.com'}
  ]);
};
