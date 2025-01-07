const mongoose = require('mongoose')
const validator = require('validator')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
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

module.exports = mongoose.model('item', itemSchema)