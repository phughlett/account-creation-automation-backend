/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {user_id: '1', title: 'Hello World', content: 'Hello World'},
    {user_id: '2', title: 'snek', content: 'It must be easy to commit crimes as a snake because you dont have to worry about leaving fingerprints.'},
    {user_id: '1', title: 'Important announcement', content: 'There arent enough towels in the world to stop the sewage flowing from his mouth.'},
    {user_id: '1', title: 'Where is Amy?', content: 'i was just thinking where the hell is amy, but i dont think her clocks set for fridays'},
    {user_id: '2', title: 'clubpenguin', content: 'Its a skateboarding penguin with a sunhat!'},
  ]);
};
