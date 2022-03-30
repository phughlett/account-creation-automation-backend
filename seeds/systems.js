/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('systems').del()
  await knex('systems').insert([
    {system_name: 'System 1', iao_name:'Michael Bloom', iao_phonenum:'(123) 456-7890', sec_man_name:'Tony Stark', sec_man_phonenum:'(123) 456-7890',info_owner_name:'Patrick Star', info_owner_phonenum:'(123) 456-7890'},
    {system_name: 'System 2', iao_name:'Devin Bradfield', iao_phonenum:'(234) 456-8901', sec_man_name:'Thantos', sec_man_phonenum:'(234) 456-8901',info_owner_name:'Spongebob Squarepants', info_owner_phonenum:'(234) 456-8901'},
    {system_name: 'System 3', iao_name:'Patrick Hughlett', iao_phonenum:'(345) 678-9012', sec_man_name:'Black Widow', sec_man_phonenum:'(345) 678-9012',info_owner_name:'Plankton', info_owner_phonenum:'(345) 678-9012'},
    {system_name: 'System 4', iao_name:'Oprah Winfrey', iao_phonenum:'(456) 789-0123', sec_man_name:'Captain America', sec_man_phonenum:'(456) 789-0123',info_owner_name:'Mister Krabs', info_owner_phonenum:'(456) 789-0123'},
    {system_name: 'System 5', iao_name:'John Batman', iao_phonenum:'(567) 890-1234', sec_man_name:'Winter Soldier', sec_man_phonenum:'(567) 890-1234',info_owner_name:'Sandy Cheeks', info_owner_phonenum:'(567) 890-1234'}
  ]);
};
