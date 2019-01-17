const watcherController = require('../controllers/WatcherController');
const appConfig = require('./../../config/appConfig')
const auth = require('../middlewares/auth')

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/watcher`;

    // params: watcherId, issueId, watcherName, typeOfUpdate, title, authToken
    app.post(`${baseUrl}/add`, auth.isAuthorized, watcherController.addWactcher);
    /**
    * @apiGroup watcher
    * @apiVersion  1.0.0
    * @api {post} /api/v1/watcher/add api for adding watcher.
    * 
    * @apiParam {string} watcherId Watcher ID of the user. (body params) (required)
    * @apiParam {string} title Title of the Issue. (body params) (required)
    * @apiParam {string} watcherName Watcher Name of the user. (body params) (required)
    * @apiParam {string} issueID Issue ID of the Issue. (body params) (required)
    * @apiParam {string} typeOfUpdate Type of Update for the Issue. (body params) (required)
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    * {
    "error": true,
    "message": "add watcher",
    "status": 200,
    "data": {
        "__v": 0,
        "_id": "5c40cc1c5f2e2538277e504c",
        "watcherName": "Xavier Hernandes",
        "typeOfUpdate": "comment",
        "title": "aatish",
        "issueId": "-5wBeIF4H",
        "watcherId": "oA9q-v_r0"
    }
}
   */

    // params: issueId, authToken
    app.get(`${baseUrl}/getAllWatchers/:issueId`, auth.isAuthorized, watcherController.getAllWatchers)
    /**
    * @apiGroup watcher
    * @apiVersion  1.0.0
    * @api {get} /api/v1/getAllWatchers/:issueId api for getting all watchers of issue.
    * 
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} issueID Issue ID of the Issue. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * @apiSuccessExample {object} Success-Response:
    * {
    "error": false,
    "message": "All Watchers Found",
    "status": 200,
    "data": [
        {
            "watcherName": "Ninad Lohar",
            "typeOfUpdate": "create issue",
            "title": "sdf",
            "issueId": "-5wBeIF4H",
            "watcherId": "oA9q-v_r0"
        },
        {
            "watcherName": "Hernandes Xavier",
            "typeOfUpdate": "comment",
            "title": "sdf",
            "issueId": "-5wBeIF4H",
            "watcherId": "sVZyR9jBy"
        }

    ]
}
    * 
   */

    // app.get(`${baseUrl}/getRandomWatchers/:watcherId`, auth.isAuthorized, watcherController.getAllWatchersNotByIssue) // api's not used in app
    // app.get(`${baseUrl}/commentBy/:issueId`, auth.isAuthorized, commentsController.getCommentByIssueId) // api's not used in app

}

module.exports = {
    setRouter: setRouter
}