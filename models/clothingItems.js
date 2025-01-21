const mongoose = require('mongoose')
const validator = require('validator')

const clothingItemSchema = new mongoose.Schema({
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
    validate: {
      validator (value) {
        return validator.isURL(value)
      },
      message: 'You must enter a valid URL'
    }
  },
  weather: {
    type: String,
    required: true,
    enum: ['hot', 'warm', 'cold']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
},
})

module.exports = mongoose.model('clothingItem', clothingItemSchema)
