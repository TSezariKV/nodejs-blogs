const express = require('express')

const router = express()

// GET requests
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
})


// export
module.exports = router