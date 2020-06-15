
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
        res.render('index')
    })
    
})

app.post('/create-item', (req, res) => {
    db.collection('items').insertOne({ text: req.body.item }, () => {
        res.send('Thanks for submitting the form')
    })
})


