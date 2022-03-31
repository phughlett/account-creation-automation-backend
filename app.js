const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
const upload = require('express-fileupload')
const fs = require('fs')
// const AdmZip = require('adm-zip')
const zip = require('express-zip')

//routes
const users = require('./routes/users')
const tickets = require('./routes/tickets')
const uploads = require('./routes/uploads')
const systems = require('./routes/systems')

const app = express();


app.use(cors())
app.use(upload())
app.use(express.json())
app.use(morgan("tiny"))
app.use("/users", users)
app.use("/tickets", tickets)
app.use("/uploads", uploads)
app.use("/systems", systems)



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

  res.status(200).send("Welome to Account Creation Backend")

})


app.post('/test/', (req, res) => {
  console.log('Req.Files: ',req.files)
  // if(req.files.length > 1) {
    console.log(req.files)
    const file = req.files.file
    const filename = file.name
    let name = req.body.name
    // let name = 'test'
    console.log(filename)

    if(fs.existsSync('./files/created/'+name+'/')){
      console.log(name);
      name = name + 'test';
      console.log(name);
    }
    fs.mkdirSync('./files/created/' + name);
    file.mv('./files/created/'+name+'/'+filename, function(err) {
      if(err) {
        res.send(err)
      } else {
        res.send("File uploaded")
      }
    })
  // }
})

app.get('/test/:id', (req, res) => {
  let userName = req.params;
  console.log(userName)
  const path = __dirname + '/files/inprogress/' + userName.id + '/';

  let fileArray = [];

  fs.readdirSync(path).forEach(file => {
    fileArray.push({path, name: file})
  })
  for(let i = 0; i < fileArray.length;i++)
  {
  res.download(fileArray[i].path, fileArray[i].name)
  }
});



module.exports = app;