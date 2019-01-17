const mongoose = require('mongoose')

let Schema = mongoose.Schema

let issueSchema = new Schema({
  issueId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  screenshot: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '',
    required: true
  },
  description: {
    type: String,
    default: '',
    required: true
  },
  reporter: {
    type: String,
    default: ''
  },
  reporterId: {
    type: String,
    default: ''
  },
  assignee: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: '',
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('Issue', issueSchema)