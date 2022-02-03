const express = require('express')
const router = express.Router()

router.use('/', (req, res) => {
    res.json([])
})

module.exports = router