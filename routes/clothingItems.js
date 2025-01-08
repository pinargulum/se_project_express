const express = require('express')
const router = express.Router()
const {
  getItems,
  createItem,
  deleteItem,
  updateItem
} = require('../controllers/clothingItemsController')


router.get('/', getItems)


router.post('/', createItem)


router.delete('/:itemId', deleteItem)
router.put('/:itemId', updateItem)

module.exports = router
