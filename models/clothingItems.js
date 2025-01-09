const mongoose = require('mongoose')
const validator = require('validator')
const user = require("./user")

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  weather: {
    type: String,
    required: true,

  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator (value) {
        return validator.isURL(value)
      },
      message: 'You must enter a valid URL'
    }
  }
})

module.exports = mongoose.model('clothingItem', clothingItemSchema)
