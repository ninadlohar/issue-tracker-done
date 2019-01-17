const mongoose = require('mongoose')
const Schema = mongoose.Schema
const time = require('../libs/timeLib')

const Watcher = new Schema({
  watcherId: {
    type: String,
    default: ''
  },
  issueId: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  typeOfUpdate: {
    type: String,
    default: ''
  },
  watcherName: {
    type: String,
    default: ''
  }
  // }
})

module.exports = mongoose.model('Watcher', Watcher)