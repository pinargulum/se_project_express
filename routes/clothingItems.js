const express = require('express')

const auth = require("../middlewares/auth")

const router = express.Router()
const { validateCreateItem, validateItem } = require("../middlewares/validation");

const {
  getClothingItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem

} = require('../controllers/clothingItemsController')

router.get('/',  getClothingItems)
router.post('/', auth, validateCreateItem, createItem)
router.delete('/:itemId', auth, validateItem, deleteItem)
router.put('/:itemId/likes', auth, validateItem, likeItem)
router.delete('/:itemId/likes', auth, validateItem, dislikeItem)

module.exports = router
