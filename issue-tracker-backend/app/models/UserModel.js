const mongoose = require('mongoose')

let Schema = mongoose.Schema

let userSchema = new Schema({
  firstName: {
    type: String,
    default: ''
  },
  userId: {
    required: true,
    unique: true,
    index: true,
    default: '',
    type: String
  },
  lastName: {
    type: String,
    default: ''
  },
  mobileNumber: {
    type: Number,
    default: '',
    min: 10,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    default: 'password'
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('User', userSchema)