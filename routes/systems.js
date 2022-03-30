const express = require('express');
const router = express.Router();
const db = require('../database/controllers');

router.route('/')
.get((req, res) => {
  db.getAllSystem()
  .then((response) => res.status(200).json(response))
  .catch((err) => {
    console.log('Error calling db.getAllSystem at endpoint /systems', err)
    res.status(401)
  })
})

module.exports = router;
