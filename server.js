require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/Blog')
const homeRoutes = require('./routes/homeRoutes')
const blogsRoutes = require('./routes/blogsRoutes')

const app = express()

// connect to database
mongoose.connect(process.env.dbURL)
    .then(() => {
        console.log('connected to database')

        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port 6969')
        })
    })
    .catch(err => console.log(err))


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/', homeRoutes)
app.use('/blogs', blogsRoutes)
