const knex = require('./dbConnection');

module.exports = {

  //User Controller Calls
  createUser: (firstname, lastname, username, hashed_password) => {
    console.log('createUser in controller called, first_name: ', firstname);
    console.log('createUser in controller called, last_name: ', lastname);
    console.log('createUser in controller called, username: ', username);
    console.log('createUser in controller called, hashpass: ', hashed_password);

    return knex('users').insert({ first_name, last_name, username, hashed_password })
  },

  getUserHashPass: (username) => {
    console.log('getUserHashPass called, username: ', username)

    return knex('users').select('hashed_password').where({ username });
  },

  getUserInfo: (username) => {
    console.log('getUserInfo called, username: ', username)

    return knex('users').select('id', 'firstname', 'lastname', 'username').where({ username });

  },

  getUserTickets: (email) => {
    console.log('Email at db.getUserTickets', { email })
    return knex('tickets').select().where({ email });
  },

  //Ticket Controller Calls

  getAllTickets: () => {
    return knex('tickets').select();
  },

  getTicket: (ticket_hash) => {
    return knex('tickets').select().where(ticket_hash);
  },

  getTicketbyID: (id) => {
    console.log('id at controller',id)
    return knex('tickets').select().where(id);
  },


  createTicket: (ticket_hash, firstname, lastname, email, systemid, form_filepath) => {
    let supervisor = false;
    let iao = false;
    let sec_man = false;
    let sys_admin = false;
    return knex('tickets').insert({ ticket_hash, firstname, lastname, email, systemid, supervisor, iao, sec_man, sys_admin, form_filepath });
  },

  updateTicketStatus: (id, { supervisor, iao, sec_man, sys_admin }) => {
    if (supervisor) {
      return knex('tickets').where({ id }).update({ supervisor });
    }
    if (iao) {
      return knex('tickets').where({ id }).update({ iao });
    }
    if (sec_man) {
      return knex('tickets').where({ id }).update({ sec_man });
    }
    if (sys_admin) {
      return knex('tickets').where({ id }).update({ sys_admin });
    }
  }

}