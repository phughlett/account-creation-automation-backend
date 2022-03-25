const express = require('express')
const router = express.Router()

router.route('/')
  .get((req, res) => {
    res.sendFile(__dirname + '/uploads.html')
  })

  .post((req, res) => {

    console.log(req.files)
    if(req.files) {
      console.log(req.files)
      const file = req.files.file
      const filename = file.name
      console.log(filename)

      file.mv('../files/created/'+filename, function(err) {
        if(err) {
          res.send(err)
        } else {
          res.send("File uploaded")
        }
      })
    }
  })

module.exports = router;