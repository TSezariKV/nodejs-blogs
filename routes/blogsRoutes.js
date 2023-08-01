const express = require('express')
const Blog = require('../models/Blog')

const routes = express()

routes.use(express.urlencoded({ extended: true }))

// GET requests
routes.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('blogs', { title: 'Blogs', blogs: result })
        })
})

routes.get('/create', (req, res) => {
    res.render('create', { title: 'New Blog' })
})

// POST requests
routes.post('/', (req, res) => {
    const blog = new Blog(req.body)
    console.log(req.body)

    blog.save()
        .then(result => {
            res.redirect('/blogs')
        })
        .catch(err => console.log(err))
})

// export
module.exports = routes