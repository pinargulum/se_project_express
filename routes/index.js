const express = require('express')
const router = express.Router()
const userRauter = require("./users.js")


router.use('/users', userRauter)
module.exports = router
