const knex = require('./dbConnection');

module.exports = {

//User Controller Calls
  createUser: (first_name, last_name, username, hashpass) => {
    console.log('createUser in controller called, first_name: ', first_name);
    console.log('createUser in controller called, last_name: ', last_name);
    console.log('createUser in controller called, username: ', username);
    console.log('createUser in controller called, hashpass: ', hashpass);

    return knex('users').insert({first_name, last_name, username, hashpass})

  },

  getUserHashPass: (username) => {
    console.log('getUserHashPass called, username: ', username)

    return knex('users').select('hashpass').where({username});
  },

  getUserInfo: (username) => {
    console.log('getUserInfo called, username: ', username)

    return knex('users').select('id','first_name', 'last_name', 'username').where({username});

  },

//Posts Controller Calls

  getAllPosts: () => {

    return knex('posts').select();
  },

  getUserPosts: (user_id) => {

    console.log('user_id at controller: ', user_id)
    return knex('posts').select().where({user_id})

  },

  getPostById: (id) => {
    return knex('posts').select().where({id})
  },

  updatePost: (id, update) => {
    console.log('db.updatePost called, id', id)
    console.log('db.updatePost called, update', update)
    let {title, content} = update;

    return knex('posts').update({title, content}).where({id})
  },

  addPost: ({ user_id, title, content }) => {
    return knex('posts').insert({user_id, title, content});
  },

  removePost: (id) => {
    console.log('remove post id', id)
    return knex('posts').where({id}).del()
  }




}