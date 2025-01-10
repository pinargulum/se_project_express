const express = require('express')

const router = express.Router()

const userRauter = require("./users.js")
const itemRauter = require("./clothingItems.js")


router.use('/users', userRauter)
router.use("/items", itemRauter)


module.exports = router
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
      if (itemId == null) {
        return res.status(400).send({ message: err.message })
      }
    })
}
const dislikeItem = (req, res) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)
