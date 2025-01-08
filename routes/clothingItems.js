const express = require('express')
const router = express.Router()
const {
  getItems,
  createItem,
  deleteItem,
  updateItem,
  likeItem,
 
} = require('../controllers/clothingItemsController')

router.get('/', getItems)
router.post('/', createItem)
router.delete('/:itemId', deleteItem)
router.put('/:itemId', updateItem)
router.put('/:itemId/likes', likeItem)
//router.delete('/:itemId/likes', dislikeItem)

module.exports = router
