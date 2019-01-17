const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const check = require('../libs/checkLib');

const IssueModel = mongoose.model('Issue');
const UserModel = mongoose.model('User');
const CommentsModel = mongoose.model('comment')

let addComment = (req, res) => {
  let validateInputs = () => {
    return new Promise((resolve, reject) => {
      if (!req.body.comment && !req.body.commentedByName && !req.body.issueId) {
        let apiResponse = response.generate(true, 'Parameters Missing', 422, null)
        reject(apiResponse)
      } else {
        resolve()
      }
    })
  }
  let createComment = () => {
    return new Promise((resolve, reject) => {
      let newComment = new CommentsModel({
        commentId: shortid.generate(),
        issueId: req.body.issueId,
        commentedByName: req.body.commentedByName,
        createdOn: time.now(),
        comment: req.body.comment,
      })
      newComment.save((err, result) => {
        if (err) {
          let apiResponse = response.generate(true, 'failed to save comment', 417, null)
          reject(apiResponse)
        } else {
          let commentObj = result.toObject()
          resolve(commentObj)
        }
      })
    })
  }
  validateInputs(req, res)
    .then(createComment)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'comment created successfully', 200, resolve)
      res.send(apiResponse)
    }).catch(err => res.send(err))
}

let getCommentByIssueId = (req, res) => {
  let validateInputs = () => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.params.issueId)) {
        let apiResponse = response.generate(true, 'Parameters Missing', 422, null)
        reject(apiResponse)
      } else {
        resolve()
      }
    })
  }
  let findComment = () => {
    return new Promise((resolve, reject) => {
      CommentsModel.find({
          issueId: req.params.issueId
        })
        .select('-_id -__v')
        .sort('-createdOn')
        .lean()
        .exec((err, result) => {
          if (err) {
            let apiResponse = response.generate(true, 'server error occured', 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'No Comments Found', 404, null)
            reject(apiResponse)
          } else {
            resolve(result)
          }
        })
    })
  }
  validateInputs(req, res)
    .then(findComment)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'comment found', 200, resolve)
      res.send(apiResponse)
    }).catch(err => res.send(err))
}

let deleteComment = (req, res) => {
  CommentsModel.findOneAndRemove({
      commentId: req.params.commentId
    })
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
      if (err) {
        let apiResponse = response.generate(true, 'failed to find the comment', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(true, 'no comment found with associated ID', 404, null)
        res.send(apiResponse)
      } else {
        let apiResponse = response.generate(true, 'comment deleted successfully', 200, result)
        res.send(apiResponse)
      }
    })
}

module.exports = {
  addComment: addComment,
  getCommentByIssueId: getCommentByIssueId,
  deleteComment: deleteComment
}