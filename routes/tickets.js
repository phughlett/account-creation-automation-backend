const express = require('express');
const router = express.Router();
const db = require('../database/controllers');
const { hash, compare } = require('bcrypt');
const saltRounds = 10;

router.route('/')
  .get((req, res) => {
    db.getAllTickets()
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err))
  });

router.route('/:id')
  .patch((req, res) => {

    let {supervisor, iao, sec_man, sys_admin} = req.body;
    let id = req.params.id

    db.updateTicketStatus(id, {supervisor, iao, sec_man, sys_admin})
      .then((response) => res.status(200).json(response))
      .catch((err) => {
        console.log('Error calling db.updateStatus at endpoint /:id', err)
        res.status(401)
      })
    })

router.route('/:ticket_hash')
  .get((req, res) => {
    let ticket_hash = req.body;

    db.getTicket(ticket_hash)
      .then((response) => res.status(200).json(response))
      .catch((err) => {
        console.log('Error calling db.getTicket at endpoint /:ticket_hash', err)
        res.status(401)
      })
  });

router.route('/create')
  .post((req, res) => {
    let { firstname, lastname, email, systemid } = req.body;

    let ticket_id = 0;
    db.getAllTickets()
      .then(response => ticket_id = response.length + 1)
      .then(() => ticket_id = ticket_id.toString())
      .then(() => {
        hash(ticket_id, saltRounds)
          .then((ticket_hash) => {
            db.createTicket(ticket_hash, firstname, lastname, email, systemid)
              .then((data) => res.status(201).json(`Ticket created successfully! Ticket Ref: ${ticket_hash}`))
              .catch((err) => {
                console.log('Error calling db.createTicket at endpoint /create', err)
                res.status(401)
              })
          })
      })
      .catch(err => console.log('Err calling getAllTickets in route /create', err))
  });

module.exports = router;