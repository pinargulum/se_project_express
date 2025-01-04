// GET ALL CLOTHING ITEMS
const getItems = (req, res) => {
  res.status(200).json({ message: 'get all items' })
}

// POST CLOTHING ITEMS
const createItem = (reg, res) => {
  res.status(201).json({
    name: 'String',
    imageUrl: 'String',
    userId: "String",
    weatherType: {
      hot: 'hot',
      warm: 'warm',
      cold: 'cold'
    }
  })
}
// DELETE CLOTHING ITEMS
const deleteItem = (req, res) => {
  res
    .status(200)
    .json({ name: 'String', imageUrl: 'String', userId: "String", id: `${req.params.id}` })
}

module.exports = { getItems, createItem, deleteItem }
