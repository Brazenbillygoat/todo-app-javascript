
const pug = require('pug')
const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './views')

app.set('view engine', 'pug')
app.set('views', viewsPath)

app.use(express.static(publicDirectoryPath))
// app.use()

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, console.log(`Server is now running on port ${port}`))