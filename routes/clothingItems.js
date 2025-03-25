const express = require('express')

const auth = require("../middlewares/auth")

const router = express.Router()
const { validateCreateItem, validateDeleteItem } = require("../middlewares/validation");

const {
  getClothingItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem

} = require('../controllers/clothingItemsController')

router.get('/',  getClothingItems)
router.post('/', auth, validateCreateItem, createItem)
router.delete('/:itemId', auth, validateDeleteItem, deleteItem)
router.put('/:itemId/likes', auth, likeItem)
router.delete('/:itemId/likes', auth, dislikeItem)

module.exports = router
