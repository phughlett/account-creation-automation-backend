const express = require('express');
const router = express.Router();
const db = require('../database/controllers');
const { hash, compare } = require('bcrypt');
const saltRounds = 10;
const fs = require('fs')
const upload = require('express-fileupload')
const path = require("path");


router.route('/')
  .get((req, res) => {
    db.getAllTickets()
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err))
  });

router.route('/:id')
  .patch((req, res) => {

    let { supervisor, iao, sec_man, sys_admin } = req.body;
    let id = req.params.id

    db.updateTicketStatus(id, { supervisor, iao, sec_man, sys_admin })
      .then((response) => res.status(200).json(response))
      .catch((err) => {
        console.log('Error calling db.updateStatus at endpoint /:id', err)
        res.status(401)
      })
  })

  .get((req, res) => {

    let id = req.params;
    // console.log(id)
    let file = '';

    db.getTicketbyID(id)
      .then(response => {

        // console.log(response)
        file = response[0].form_filepath
        res.download(file)
      })
      .catch(err => console.log('Error calling getTicketbyID', err))

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
    let { firstname, lastname, email, systemid, formname } = req.body;
    let files = req.files.file;

    // console.log('req.files', req.files)
    // console.log('req.files.file: ', files)
    let userpath = `${lastname}-${firstname}`

    fs.mkdirSync(path.join(`./files/inprogress/`, userpath), { recursive: true });
    let statusArray = [];
    // console.log('files length', files.length)


    if (!files.length) {
      // console.log('One File')

      let form_filepath = `./files/inprogress/${userpath}/${files.name}`
      let fileExist = fs.existsSync(`./files/inprogress/${userpath}/${files.name}`)
      // console.log('Condition line 64', fileExist)


      if (!fileExist) {
        files.mv(`./files/inprogress/${userpath}/${files.name}`, (err) => {
          if (err) console.log(err)
          else {

            let form_filepath = `./files/inprogress/${userpath}/${files.name}`


            let ticket_id = 0;
            db.getAllTickets()
              .then(response => ticket_id = response.length + 1)
              .then(() => ticket_id = ticket_id.toString())
              .then(() => {
                hash(ticket_id, saltRounds)
                  .then((ticket_hash) => {
                    db.createTicket(ticket_hash, firstname, lastname, email, systemid, formname, form_filepath)
                      .then(() => res.status(200).json(`Ticket created successfully! Ticket Ref: ${ticket_hash}`))
                      .catch((err) => {
                        console.log('Error calling db.createTicket at endpoint /create', err)
                        res.status(401)
                      })
                  })
              })
              .catch(err => console.log('Err calling getAllTickets in route /create', err))
          }
        })
      } else {
        res.status(206).json('Ticket already exists!')
      }

    } else {

      console.log('More than one file')

      for (let i = 0; i < files.length; ++i) {
        //console.log('File in ForEach',file)

        fileExist = fs.existsSync(`./files/inprogress/${userpath}/${files[i].name}`)
        console.log('Condition for fileExit, multiple files', fileExist)


        if (!fileExist) {
          files[i].mv(`./files/inprogress/${userpath}/${files[i].name}`, (err) => {
            if (err) console.log(err)
            else {

              let form_filepath = `./files/inprogress/${userpath}/${files[i].name}`

              let ticket_id = 0;
              db.getAllTickets()
                .then(response => ticket_id = response.length + 1)
                .then(() => ticket_id = ticket_id.toString())
                .then(() => {
                  hash(ticket_id, saltRounds)
                    .then((ticket_hash) => {
                      db.createTicket(ticket_hash, firstname, lastname, email, systemid, formname, form_filepath)
                        .then(() => statusArray.push(`Ticket created successfully! Ticket Ref: ${ticket_hash}`))
                        .then(() => {
                          if (i === files.length - 1) {
                            console.log('StatusArray: ', statusArray)
                            res.status(200).json(statusArray)
                          }

                        })
                        .catch((err) => {
                          console.log('Error calling db.createTicket at endpoint /create', err)
                          res.status(401)
                        })
                    })
                })
                .catch(err => console.log('Err calling getAllTickets in route /create', err))
            }
          })
        }else if (i === files.length -1){
          res.status(206).json('Some tickets created, others may exist already.')
        }

      }
    }
  })

router.route('/update')
  .patch((req, res) => {


    let { firstname, lastname, email, systemid, formname, supervisor, iao, sec_man, sys_admin } = req.body
    let files = req.files.file;
    let userpath = `${lastname}-${firstname}`
    let ticket_id = 0;

    if (!files.length) {
      files.mv(`./files/inprogress/${userpath}/${files.name}`, (err) => {
        if (err) console.log(err)
        else {
          let form_filepath = `./files/inprogress/${userpath}/${files.name}`
          db.findTicket(firstname, lastname, email, systemid, formname)
            .then((response) => {
              ticket = response[0]
              // console.log(ticket)
              let ticket_id = ticket.id
              if(ticket.supervisor) supervisor = true
              if(ticket.iao) iao = true
              if(ticket.sec_man) sec_man = true
              if(ticket.sys_admin) sys_admin = true
              db.updateTicketStatus(ticket_id, supervisor, iao, sec_man, sys_admin)
                .then(() => res.status(200).json(`Ticket updated!`))
                .catch((err) => {
                  console.log('Error calling db.updateTicketStatus at endpoint /update', err)
                  res.status(401)
                })


            })
            .catch(err => console.log('Error calling db.findTicket @ endpoint /tickets/update',err))
        }
      })
    }
  })

module.exports = router;