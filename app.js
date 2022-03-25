const express = require("express")
const morgan = require("morgan");
const cors = require('cors');
const upload = require('express-fileupload');

//routes
const users = require('./routes/users')
const tickets = require('./routes/tickets')
const uploads = require('./routes/uploads')

const app = express();


app.use(cors())
app.use(upload())
app.use(express.json())
app.use(morgan("tiny"))
app.use("/users", users)
app.use("/tickets", tickets)
app.use("/uploads", uploads)



// app.get('/', (req, res) => {
//   res.status(200).send('Blog Site')
// });

app.post('/', (req, res) => {
    console.log(req.files)
    if(req.files) {
      console.log(req.files)
      const file = req.files.file
      const filename = file.name
      console.log(filename)

      file.mv('./files/created/'+filename, function(err) {
        if(err) {
          res.send(err)
        } else {
          res.send("File uploaded")
        }
      })
    }
  })

app.get('/', (req, res) => {
  const file = './files/created/2875 unlocked .pdf';
  res.download(file);
})


app.post('/test/', (req, res) => {
  console.log(req.files)
  if(req.files) {
    console.log(req.files)
    const file = req.files.file
    const filename = file.name
    const name = req.body.name
    console.log(filename)

    file.mv('./files/created/'+name+'/'+filename, function(err) {
      if(err) {
        res.send(err)
      } else {
        res.send("File uploaded")
      }
    })
  }
})

app.get('/test/', (req, res) => {
const file = './files/created/' + req.body.name + '/' + req.body.filename;
res.download(file);
});



module.exports = app;