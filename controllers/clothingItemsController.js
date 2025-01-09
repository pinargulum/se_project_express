const ClothingItem = require('../models/clothingItems')
const errorType = require('../utils/errors')

// get all the items
const getItems = (req, res) => {
  ClothingItem.find({})
    .then(clothingItems => {
      res.status(200).send(clothingItems)
    })
    .catch(err => {
      console.error(err)
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message })
      }
      res.status(500).send({ message: err.message })
    })
}

// create a new item
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body
  const owner = req.user._id
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then(item => {
      console.log(item)
      res.status(201).send(item)
    })
    .catch(err => {
      console.error(err)
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message })
      }
      res.status(500).send({ message: err.message })
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
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message })
      }
      res.status(500).send({ message: err.message })
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
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message })
      }
      res.status(500).send({ message: err.message })
    })
}
const likeItem = (req, res) => {
  const { itemId } = req.params
  const { name, weather, imageUrl } = req.body
  ClothingItem.findByIdAndUpdate(itemId, { $set: { name, weather, imageUrl } })
    .orFail()
    .then(item => {
      res.status(200).send({ data: item })
    })
    .catch(err => {
      console.error(err)
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message })
      }
      res.status(500).send({ message: err.message })
    })
}
const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
  .catch(err => {
    console.error(err)
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message })
    }
    res.status(500).send({ message: err.message })
  })
module.exports = {
  getItems,
  deleteItem,
  createItem,
  updateItem,
  likeItem,
  dislikeItem
}
