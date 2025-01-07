const express = require('express')
const router = express.Router()
const {
  getItems,
  createItem,
  deleteItem
} = require('../controllers/clothingItemsController')

//GET ALL THE ITEMS
router.get('/', getItems)

// POST ITEMS
router.post('/', createItem)

//DELETE ITEMS
router.delete('/:itemId', deleteItem)

module.exports = router
