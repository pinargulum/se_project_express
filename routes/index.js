const express = require('express')
const router = express.Router()
const userRauter = require("./users.js")
const itemRauter = require("./clothingItems.js")


router.use('/users', userRauter)
router.use("/items", itemRauter)


module.exports = router

