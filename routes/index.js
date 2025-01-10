const express = require('express')

const router = express.Router()

const userRauter = require("./users")

const itemRauter = require("./clothingItems")


router.use('/users', userRauter)
router.use("/items", itemRauter)


module.exports = router

