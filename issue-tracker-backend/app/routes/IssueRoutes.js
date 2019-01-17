const issueController = require('../controllers/IssueController');
const appConfig = require('./../../config/appConfig')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')
let setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/issue`;

  // params: title, description, reporter, reporterId, assignee, status, screenshot, authToken
  app.post(`${baseUrl}/createIssue`, [multer.upload.single('image')], issueController.createNewIssue);
  /**
   * @apiGroup issue
   * @apiVersion  1.0.0
   * @api {post} /api/v1/issue/createIssue api for creating new issue. 
   * 
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} title Title of the Issue. (query params) (required)
   * @apiParam {string} description Description of the Issue. (query params) (required)
   * @apiParam {string} reporter Reporter of the Issue. (query params) (required)
   * @apiParam {string} reporterId Reporter Id of the Issue. (query params) (required)
   * @apiParam {string} assignee Assignee of the Issue. (query params) (required)
   * @apiParam {string} status Status of the Issue. (query params) (required)
   * @apiParam {string} screenshot Screenshot of the Issue. (query params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * { 
    "error": false,
    "message": 'issue successfully created',
    "status": 200,
    "data": { 
        "__v": 0,
        "_id": "5c40d30a7b1232404f885aab",
        "createdOn": "2019-01-17T19:10:02.000Z",
        "status": 'in-test',
        "assignee": '7emnEob6_',
        "reporterId": 'sVZyR9jBy',
        "reporter": 'Hernandes Xavier',
        "description:: 'Bastic',
        "title": 'Boom',
        "screenshot": '1547752202836_Screenshot from 2019-01-04 00-18-26.png',
        "issueId": 'lP08L9RkE' 
    } 
}
   */

  // params: authToken, issueId
  app.get(`${baseUrl}/getAllIssues`, auth.isAuthorized, issueController.getAllIssues);
  /**
   * @apiGroup issue
   * @apiVersion  1.0.0
   * @api {get} /api/v1/issue/getAllIssues api getting all issues.  
   * 
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "all issues found",
    "status": 200,
    "data": [
        {
            "createdOn": "2019-01-17T17:28:30.000Z",
            "status": "backlog",
            "assignee": "oA9q-v_r0",
            "reporterId": "oA9q-v_r0",
            "reporter": "Ninad Lohar",
            "description": "dsf",
            "title": "sdf",
            "screenshot": "",
            "issueId": "-5wBeIF4H"
        },
        {
            "createdOn": "2019-01-17T19:10:02.000Z",
            "status": "in-test",
            "assignee": "7emnEob6_",
            "reporterId": "sVZyR9jBy",
            "reporter": "Hernandes Xavier",
            "description": "Bastic",
            "title": "Boom",
            "screenshot": "1547752202836_Screenshot from 2019-01-04 00-18-26.png",
            "issueId": "lP08L9RkE"
        }
    ]
}
   */

  // params: authToken, issueId, title, description, screenshot, assignee, status
  app.put(`${baseUrl}/updateIssue/:issueId`, [multer.upload.single('image')], issueController.updateSelectedIssue)
  /**
   * @apiGroup issue
   * @apiVersion  1.0.0
   * @api {put} /api/v1/issue/updateIssue/:issueId api for updating single issues.  
   * 
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} assignee Assignee of the Issue. (body params) (required)
   * @apiParam {string} status Status of the Issue. (body params) (required)
   * @apiParam {string} screenshot Screenshot of the Issue. (body params) (required)
   * @apiParam {string} description Description of the Issue. (body params) (required)
   * @apiParam {string} title Title of the Issue. (body params) (required)
   * @apiParam {string} issueId IssueId of the Issue. (query params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * { 
    "error": false,
    "message": 'issue updated',
    "status": 200,
    "data": { 
        n: 1, 
        nModified: 1,
        ok: 1 
    } 
}
   */

  // params: authToken, issueId
  app.get(`${baseUrl}/getSingleIssue/:issueId`, auth.isAuthorized, issueController.getSelectedIssue)
  /**
   * @apiGroup issue
   * @apiVersion  1.0.0
   * @api {get} /api/v1/issue/getSingleIssue/:issueId api for fetching single issue 
   * 
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} issueId IssueId of the Issue. (query params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "Issue Found",
    "status": 200,
    "data": [
        {
            "createdOn": "2019-01-17T17:28:30.000Z",
            "status": "backlog",
            "assignee": "7emnEob6_",
            "reporterId": "oA9q-v_r0",
            "reporter": "Ninad Lohar",
            "description": "well played",
            "title": "NewBie",
            "screenshot": "",
            "issueId": "-5wBeIF4H"
        }
    ]
}
   */

  // params: authToken, assignee
  app.get(`${baseUrl}/getIssuesByAssignee/:assignee`, auth.isAuthorized, issueController.getIssuesByAssignee)
  /**
   * @apiGroup issue
   * @apiVersion  1.0.0
   * @api {get} /api/v1/issue/getIssuesByAssignee/:assignee api for fetching all issues by assignee 
   * 
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} assignee Assignee ID of the user. (query params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "Issue Found",
    "status": 200,
    "data": [
        {
            "_id": "5c40bb3e5763951e01d12ab7",
            "__v": 0,
            "createdOn": "2019-01-17T17:28:30.000Z",
            "status": "backlog",
            "assignee": "7emnEob6_",
            "reporterId": "oA9q-v_r0",
            "reporter": "Ninad Lohar",
            "description": "well played",
            "title": "NewBie",
            "screenshot": "",
            "issueId": "-5wBeIF4H"
        },
        {
            "_id": "5c40d30a7b1232404f885aab",
            "__v": 0,
            "createdOn": "2019-01-17T19:10:02.000Z",
            "status": "in-test",
            "assignee": "7emnEob6_",
            "reporterId": "sVZyR9jBy",
            "reporter": "Hernandes Xavier",
            "description": "Bastic",
            "title": "Boom",
            "screenshot": "1547752202836_Screenshot from 2019-01-04 00-18-26.png",
            "issueId": "lP08L9RkE"
        }
    ]
}
   */

  // params: authToken, userId
  app.get(`${baseUrl}/x/:userId`, auth.isAuthorized, issueController.x)
  /**
   * @apiGroup issue
   * @apiVersion  1.0.0
   * @api {get} /api/v1/issue/createIssue api for fetching all issues by assignee 
   * 
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} userId User Id of the user. (query params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "all issues found",
    "status": 200,
    "data": [
        {
            "createdOn": "2019-01-17T19:10:02.000Z",
            "status": "in-test",
            "assignee": "7emnEob6_",
            "reporterId": "sVZyR9jBy",
            "reporter": "Hernandes Xavier",
            "description": "Bastic",
            "title": "Boom",
            "screenshot": "1547752202836_Screenshot from 2019-01-04 00-18-26.png",
            "issueId": "lP08L9RkE"
        }
    ]
}
   */

  // app.post(`${baseUrl}/addWatcher/:issueId`, auth.isAuthorized, issueController.addWatcher)

}

module.exports = {
  setRouter: setRouter
}