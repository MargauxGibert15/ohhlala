const mongoose = require('mongoose')

const patternSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'Your pattern must have a name'],
    minlength: 1,
  },

  description: {
    type: String,
  },
  image: {
    type: String,
  },
})

const Pattern = mongoose.model('Pattern', patternSchema)

module.exports = Pattern
