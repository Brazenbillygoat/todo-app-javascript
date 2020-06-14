const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, console.log(`Server is now running on port ${port}`))