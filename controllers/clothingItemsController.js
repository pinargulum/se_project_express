const ClothingItem = require('../models/clothingItems')

// get all the items
const getItems = (req, res) => {
  ClothingItem.find({})
    .then(clothingItems => {
      res.status(200).send(clothingItems)
    })
    .catch(err => {
      console.error(err)
      return res.status(400).send({ message: err.message })
    })
}
// create a new item
const createItem = (req, res) => {
  const { name, imageUrl, weather } = req.body
  ClothingItem.create({ name, imageUrl, weather })
    .then(item => {
      res.status(201).send({ data: item })
    })
    .catch(err => {
      console.error(err)
      return res.status(400).send({ message: err.message })
    })
}
//delete item by id
const deleteItem = (req, res) => {
  const { itemId } = req.params
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(item => {
      if (item == null) res.send(item)
    })
    .catch(err => {
      console.error(err)
      return res.status(400).send({ message: err.message })
    })
}
// update items by id
const updateItem = (req, res) => {
  const { itemId } = req.params
  const { name, weather, imageUrl } = req.body
  ClothingItem.findByIdAndUpdate(itemId, { $set: { name, weather, imageUrl } })
    .orFail()
    .then(item => {
      res.status(200).send({ data: item })
    })
    .catch(err => {
      console.error(err)
      return res.status(400).send({ message: err.message })
    })
}

module.exports = { getItems, createItem, deleteItem, updateItem }
