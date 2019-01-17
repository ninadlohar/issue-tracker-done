const mongoose = require('mongoose');
const response = require('./../libs/responseLib')
const WactherModel = mongoose.model('Watcher')
const check = require('../libs/checkLib')

let addWactcher = (req, res) => {
  let watcher = new WactherModel({
    watcherId: req.body.watcherId,
    issueId: req.body.issueId,
    title: req.body.title,
    typeOfUpdate: req.body.typeOfUpdate,
    watcherName: req.body.watcherName
  })
  watcher.save((err, result) => {
    if (err) {
      let res1 = response.generate(false, 'cannot add watcher', 401, null)
      res.send(res1)
    } else {
      let res1 = response.generate(true, 'add watcher', 200, result)
      res.send(res1)
    }
  })
}

let getAllWatchers = (req, res) => {
  WactherModel.find({
      issueId: req.params.issueId
    })
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
      if (err) {
        let res1 = response.generate(true, 'server error', 500, null)
        res.send(res1)
      } else if (check.isEmpty(result)) {
        let res1 = response.generate(true, 'no watchers found', 404, null)
        res.send(res1)
      } else {
        let res1 = response.generate(false, 'All Watchers Found', 200, result)
        res.send(res1)
      }
    })
}

let getAllWatchersNotByIssue = (req, res) => {
  WactherModel.find({
    watcherId: req.params.watcherId
  })
  .select('-__v -_id')
  .lean()
  .exec((err, result) => {
    if (err) {
      let res1 = response.generate(true, 'server error', 500, null)
      res.send(res1)
    } else if (check.isEmpty(result)) {
      let res1 = response.generate(true, 'no watchers found', 404, null)
      res.send(res1)
    } else {
      let res1 = response.generate(false, 'All Watchers Found', 200, result)
      res.send(res1)
    }
  })
}

module.exports = {
  addWactcher: addWactcher,
  getAllWatchers: getAllWatchers,
  getAllWatchersNotByIssue: getAllWatchersNotByIssue
}