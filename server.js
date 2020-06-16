
const pug = require('pug')
const mongodb = require('mongodb')
const path = require('path')
const express = require('express')
const sanitizeHTML = require('sanitize-html')

const app = express()
let db

const connectionURL = 'mongodb+srv://taskapp:TeenageDrama3@cluster0.mhs6x.mongodb.net/ToDoApp?retryWrites=true&w=majority'
mongodb.connect(connectionURL, { useUnifiedTopology: true }, (err, client) => {
    db = client.db()

    //I like to log a message when the server starts. It's just an extra
    //visual that things are running smoothly, and we can never have enough of those.
    app.listen(port, console.log(`Server is now running on port ${port}`))
})

const port = process.env.PORT || 3000

//I made these paths variables bc I think it made the code look cleaner
//and I may need to use them again.
const publicDirectoryPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, './views')

//Setting the view engine and then helping that view engine find the views file.
//I prefer handlebars but wanted to give pug a go.
app.set('view engine', 'pug')
app.set('views', viewsPath)

//The second line tells express to add my form value to body and then to
//the request object because express does not do this by default.
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

function passwordProtected(req, res, next) {
  res.set('WWW-Authenticate', 'Basic realm="Simple Todo App"')
  console.log(req.headers.authorization)
  if (req.headers.authorization == "Basic dGVzdDpwYXNzd29yZA==") {
    next()
  } else {
    res.status(401).send('Authentication required')
  }
}

app.use(passwordProtected)

//Starting my CRUD methods
app.get('', (req, res) => {
    db.collection('items').find().toArray((err, items) => {
        res.send(`<!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Simple To-Do App</title>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
            </head>
            <body>
              <div class="container">
                <h1 class="display-4 text-center py-1">To-Do App</h1>
                
                <div class="jumbotron p-3 shadow-sm">
                  <form id="create-form" action="/create-item" method="POST">
                    <div class="d-flex align-items-center">
                      <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                      <button class="btn btn-primary">Add New Item</button>
                    </div>
                  </form>
                </div>
                
                <ul id="item-list" class="list-group pb-5">
                </ul>
                
              </div>

              <script>
                  const items = ${JSON.stringify(items)}
              </script>

              <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
              <script src="/app.js"></script>
            </body>
            </html>)`
        )
    })
    
})

app.post('/create-item', (req, res) => {
  const safeText = sanitizeHTML(req.body.text, {allowedTags: [], allowedAttributes: {}})
  db.collection('items').insertOne({ text: safeText }, (err, info) => {
        res.json(info.ops[0])
    })
})

app.post('/update-item', (req, res) => {
  //const safeText = sanitizeHTML(req.body.text, {allowedTags: [], allowedAttributes: {}})
  db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)}, {$set: {text: safeText}}, () => {
    res.send("Success")
  })
})

app.post('/delete-item', (req,res) => {
  db.collection('items').deleteOne({_id: new mongodb.ObjectId(req.body.id)}, () => {
    res.send('Success')
  })
})
