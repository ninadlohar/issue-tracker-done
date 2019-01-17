const mongoose = require('mongoose')

let Schema = mongoose.Schema

let commentModel = new Schema({
  commentId: {
    type: String,
    default: '',
    required: true,
    unique: true,
    index: true
  },
  comment: {
    type: String,
    default: ''
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  issueId: { // the post/issue ID
    type: String, 
    required: true,
    default: ''
  },
  commentedByName: {
    type: String, 
    required: true,
    default: ''
  }
})

mongoose.model('comment', commentModel)