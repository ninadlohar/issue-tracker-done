const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const check = require('../libs/checkLib');
const fs = require('fs')
const IssueModel = mongoose.model('Issue');
const UserModel = mongoose.model('User');

let createNewIssue = (req, res) => {
  let validateUserInput = () => {
    return new Promise((resolve, reject) => {
      if (req.body.title && req.body.description && req.body.status && req.body.assignee) {
        resolve(req)
      } else {
        let apiResponse = response.generate(true, 'inputs are missing', 422, null);
        reject(apiResponse)
      }
    })
  }
  let createIssue = () => {
    return new Promise((resolve, reject) => {
      IssueModel.findOne({
        title: req.body.title
      }, (err, result) => {
        if (err) {
          let apiResponse = response.generate(true, 'server error', 500, null)
          reject(apiResponse)
        } else if (check.isEmpty(result)) {
          if (req.file) {
            let issue = new IssueModel({
              issueId: shortid.generate(),
              title: req.body.title,
              description: req.body.description,
              reporter: req.body.reporter,
              reporterId: req.body.reporterId,
              assignee: req.body.assignee,
              status: req.body.status,
              screenshot: req.file.filename,
              createdOn: time.now(),
            })
            issue.save((err, issue1) => {
              if (err) {
                let apiResponse = response.generate(true, 'failed to save issue details', 500, null)
                reject(apiResponse)
              } else {
                let issue2 = issue1.toObject()
                resolve(issue2)
              }
            })
          } else {
            let issue = new IssueModel({
              issueId: shortid.generate(),
              title: req.body.title,
              description: req.body.description,
              reporter: req.body.reporter,
              reporterId: req.body.reporterId,
              assignee: req.body.assignee,
              status: req.body.status,
              createdOn: time.now(),
            })
            issue.save((err, issue1) => {
              if (err) {
                let apiResponse = response.generate(true, 'failed to save issue details', 500, null)
                reject(apiResponse)
              } else {
                let issue2 = issue1.toObject()
                resolve(issue2)
              }
            })
          }
        } else {
          let apiResponse = response.generate(true, 'title of the issue is already used, please use another one', 422, null)
          reject(apiResponse)
        }
      })
    })
  }
  validateUserInput(req, res)
    .then(createIssue)
    .then((resolve) => {
      let apiResponse = response.generate(false, 'issue successfully created', 200, resolve)
      console.log(apiResponse)
      res.send(apiResponse)
    }).catch(err => res.send(err))
}

let getAllIssues = (req, res) => { // i want over here
  IssueModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
      if (err) {
        let apiResponse = response.generate(true, 'failed finding issues', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(true, 'no issues found', 404, null)
        res.send(apiResponse)
      } else {
        let apiResponse = response.generate(false, 'all issues found', 200, result)
        res.send(apiResponse)
      }
    })
}

// let updateSelectedIssue = (req, res) => {
//   let findIssue = () => {
//     return new Promise((resolve, reject) => {
//       IssueModel.findOne({
//         issueId: req.params.issueId
//       }, (err, result) => {
//         if (err) {
//           let apiResponse = response.generate(true, 'server error occured', 500, null)
//           reject(apiResponse)
//         } else if (check.isEmpty(result)) {
//           let apiResponse = response.generate(true, 'No Issue Found', 404, null)
//           reject(apiResponse)
//         } else {
//           resolve(result)
//         }
//       })
//     })
//   }
//   let update = (result) => {
//     return new Promise((resolve, reject) => {
//       if (req.file) {
//         fs.unlinkSync('./uploads/' + req.body.previous);

//         let options = req.body;
//         options.screenshot = req.file.filename

//         IssueModel.update({
//           issueId: req.params.issueId
//         }, options, (err, result1) => {
//           if (err) {
//             let apiResponse = response.generate(true, 'server error', 500, null)
//             reject(apiResponse)
//           } else if (check.isEmpty(result1)) {
//             let apiResponse = response.generate(true, 'No Issue Found', 404, null)
//             reject(apiResponse)
//           } else {
//             resolve(result1)
//           }
//         })
//       } else {
//         let options = req.body;
//         options.screenshot = `${req.body.previous}`;
//         IssueModel.update({
//           issueId: req.params.issueId
//         }, options, (err, result1) => {
//           if (err) {
//             let apiResponse = response.generate(true, 'server error', 500, null)
//             reject(apiResponse)
//           } else if (check.isEmpty(result1)) {
//             let apiResponse = response.generate(true, 'No Issue Found', 404, null)
//             reject(apiResponse)
//           } else {
//             resolve(result1)
//           }
//         })
//       }
//     })
//   }
//   findIssue(req, res)
//     .then(update)
//     .then((resolve) => {
//       let apiResponse = response.generate(false, 'Issue Edited Successfully', 200, resolve)
//       res.send(apiResponse)
//     }).catch(err => res.send(err))
// }

let updateSelectedIssue = (req, res) => {
  if (req.file) {
    fs.unlinkSync('./uploads/' + req.body.previous);
    let options = req.body;
    options.screenshot = req.file.filename
    IssueModel.update({
        'issueId': req.params.issueId
      }, options)
      .select('-__v -_id')
      .lean()
      .exec((err, result) => {
        if (err) {
          let apiResponse = response.generate(true, 'server error', 500, null)
          res.send(apiResponse)
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(true, 'issue not found', 404, null)
          res.send(apiResponse)
        } else {
          let apiResponse = response.generate(false, 'issue updated', 200, result)
          res.send(apiResponse)
        }
      })
  } else {
    let options = req.body;
    options.screenshot = `${req.body.previous}`
    IssueModel.update({
        'issueId': req.params.issueId
      }, options)
      .select('-__v -_id')
      .lean()
      .exec((err, result) => {
        if (err) {
          let apiResponse = response.generate(true, 'server error', 500, null)
          res.send(apiResponse)
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(true, 'issue not found', 404, null)
          res.send(apiResponse)
        } else {
          let apiResponse = response.generate(false, 'issue updated', 200, result)
          console.log(apiResponse)
          res.send(apiResponse)
        }
      })
  }
}

let getSelectedIssue = (req, res) => {
  if (check.isEmpty(req.params.issueId)) {
    let apiResponse = response.generate(true, 'Issue Parameter Missing', 422, null)
    res.send(apiResponse)
  } else {
    IssueModel.find({
        issueId: req.params.issueId
      })
      .select('-_id -__v')
      .lean()
      .exec((err, result) => {
        if (err) {
          let apiResponse = response.generate(true, 'server error occured', 500, null)
          res.send(apiResponse)
        } else if (check.isEmpty(result)) {
          let apiResponse = response.generate(true, 'No Issue Found', 404, null)
          res.send(apiResponse)
        } else {
          let apiResponse = response.generate(false, 'Issue Found', 200, result)
          res.send(apiResponse)
        }
      })
  }
}

let getIssuesByAssignee = (req, res) => {
  IssueModel.find({
    assignee: req.params.assignee
  }, (err, result) => {
    if (err) {
      let apiResponse = response.generate(true, 'server error occured', 500, null)
      res.send(apiResponse)
    } else if (check.isEmpty(result)) {
      let apiResponse = response.generate(true, 'No Issue Found', 404, null)
      res.send(apiResponse)
    } else {
      let apiResponse = response.generate(false, 'Issue Found', 200, result)
      res.send(apiResponse)
    }
  })
}


let x = (req, res) => { // i want over here
  let query = {
    $and: [{
      assignee: {
        $ne: req.params.userId
      },
      reporterId: {
        $ne: req.params.userId
      }
    }]
  }
  IssueModel.find(query)
    .select('-__v -_id')
    .lean()
    .exec((err, result) => {
      if (err) {
        let apiResponse = response.generate(true, 'failed finding issues', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(true, 'no issues found', 404, null)
        res.send(apiResponse)
      } else {
        let apiResponse = response.generate(false, 'all issues found', 200, result)
        res.send(apiResponse)
      }
    })
}

let addWatcher = (req, res) => {
  let options = {
    $push: {
      watchers: req.body.watchers
    }
  }
  IssueModel.update({
    issueId: req.body.issueId
  }, options, (err, result) => {
    if (err) {
      let apiResponse = response.generate(true, 'failed to add watcher', 500, null)
      res.send(apiResponse)
    } else {
      let apiResponse = response.generate(false, 'added watcher', 200, result)
      res.send(apiResponse)
    }
  })
}

module.exports = {
  createNewIssue: createNewIssue,
  getAllIssues: getAllIssues,
  updateSelectedIssue: updateSelectedIssue,
  getSelectedIssue: getSelectedIssue,
  getIssuesByAssignee: getIssuesByAssignee,
  x: x,
  addWatcher: addWatcher

}