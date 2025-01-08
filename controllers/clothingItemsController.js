const ClothingItem = require('../models/clothingItems')
//const ClothingItem = require('../models/clothingItems')

// GET ALL THE USERS
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

// GET SINGLE USER
const deleteItem = (req, res) => {
  const { itemId } = req.params
  ClothingItem.findByIdAndDelete(itemId)
  .orFail()
  .then((item) => {
    if (item == null)
    res.send(item);
  })
    .catch((err) => {
      console.error(err)
      return res.status(400).send({ message: err.message })
    })
}

// POST NEW USER
const createItem = (req, res) => {
  const { name, imageUrl, weather } = req.body
  ClothingItem.create({ name, imageUrl, weather })
  //console.log(req.user._id)
    .then(item => {
      res.status(201).send({data: item})
    })
    .catch(err => {
      console.error(err)
      return res.status(400).send({ message: err.message })
    })
}

module.exports = { getItems, createItem, deleteItem }
