const ClothingItem = require('../models/clothingItems')

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
      return res.status(500).send({ message: err.message })
    })
}

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
      return res.status(500).send({ message: err.message })
    })
}

const deleteItem = (req, res) => {
  const { itemId } = req.params
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(item => {
      res.status(200).send(item)
    })
    .catch(err => {
      console.error(err)
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message })
      }
      return res.status(404).send({ message: err.message })
    })
}

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
      return res.status(404).send({ message: err.message })
    })
}
const likeItem = (req, res) => {
  const { itemId } = req.params
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then(item => {
      res.status(200).send({ data: item })
    })
    .catch(err => {
      console.error(err)
      return res.status(400).send({ message: err.message })
    })
}
const dislikeItem = (req, res) => {
  const { itemId } = req.params
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then(item => {
      res.status(200).send({ data: item })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).send({ message: err.message })
    })
}

module.exports = {
  getItems,
  deleteItem,
  createItem,
  updateItem,
  likeItem,
  dislikeItem
}
