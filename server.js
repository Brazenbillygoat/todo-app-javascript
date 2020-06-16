
const pug = require('pug')
const mongodb = require('mongodb')
const path = require('path')
const express = require('express')

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
app.use(express.urlencoded({extended: false}))

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
                  <form action="/create-item" method="POST">
                    <div class="d-flex align-items-center">
                      <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                      <button class="btn btn-primary">Add New Item</button>
                    </div>
                  </form>
                </div>
                
                <ul class="list-group pb-5">
                  ${items.map((item) => {
                      return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                      <span class="item-text">${item.text}</span>
                      <div>
                        <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                        <button class="delete-me btn btn-danger btn-sm">Delete</button>
                      </div>
                    </li>`
                  }).join(' ')}
                </ul>
                
              </div>
              
            </body>
            </html>)`
        )
    })
    
})

app.post('/create-item', (req, res) => {
    db.collection('items').insertOne({ text: req.body.item }, () => {
        res.redirect('/')
    })
})


