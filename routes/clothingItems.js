const express = require('express')

const auth = require("../middlewares/auth")

const router = express.Router()

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem

} = require('../controllers/clothingItemsController')

router.get('/', getItems)
router.post('/', createItem)
router.delete('/:itemId', auth, deleteItem)
router.put('/:itemId/likes', likeItem)
router.delete('/:itemId/likes', dislikeItem)

module.exports = router
