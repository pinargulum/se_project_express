const express = require('express')

const router = express.Router()

const userRauter = require('./users')

const itemRauter = require('./clothingItems')

const { NOT_FOUND } = require("../utils/constants")

router.use('/users', userRauter)
router.use('/items', itemRauter)
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Page not found' })
})

module.exports = router
