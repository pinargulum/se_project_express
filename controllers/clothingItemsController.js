const clothingItem = require('../models/clothingItems')
//const ClothingItem = require('../models/clothingItems')

// GET ALL THE USERS
const getItems = (req, res) => {
  clothingItem.find({})
    .then(clothingItems => {
      res.status(200).send(clothingItems)
    })
    .catch(err => {
      console.error(err)
      return res.status(400).send({ message: err.message })
    })
}

// GET SINGLE USER
const deleteItem = (req, res) => {
  const { itemId } = req.param
  clothingItem.findById(itemId)
    .then(clothingItems => {
      res.status(200).send(clothingItems)
    })
    .catch(err => {
      console.error(err)
      return res.status(400).send({ message: err.message })
    })
}

// POST NEW USER
const createItem = (req, res) => {
  const { name, imageUrl, weather } = req.body
  clothingItem.create({ name, imageUrl, weather })
    .then(clothingItem => {
      res.status(201).send(clothingItem)
    })
    .catch(err => {
      console.error(err)
      return res.status(400).send({ message: err.message })
    })
}

module.exports = { getItems, createItem, deleteItem }
