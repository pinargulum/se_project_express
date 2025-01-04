const express = require('express')
const router = express.Router()
const {
  getItems,
  createItem,
  deleteItem
} = require('../controllers/itemsController')

//GET ALL THE ITEMS
router.route('/').get(getItems)

// POST ITEMS
router.route('/').post(createItem)

//DELETE ITEMS
router.route('/:id').delete(deleteItem)

module.exports = router
