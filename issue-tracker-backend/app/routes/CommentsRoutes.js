const commentsController = require('../controllers/CommentsController');
const appConfig = require('./../../config/appConfig')
const auth = require('../middlewares/auth')

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/comments`;

    // params: authToken, issueId, commentedByName, comment
    app.post(`${baseUrl}/createComment`, auth.isAuthorized, commentsController.addComment);
    /**
   * @apiGroup comments
   * @apiVersion  1.0.0
   * @api {post} /api/v1/comments/createComment api for Creating New Comment.
   * 
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} issueId Issue ID of the Issue. (body params) (required)
   * @apiParam {string} commentedByName Commentor of the Issue. (body params) (required)
   * @apiParam {string} comment Comment of the comment. (body params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "comment created successfully",
    "status": 200,
    "data": {
        "__v": 0,
        "_id": "5c40cee0fba8c93aa7da259d",
        "commentedByName": "Akash Pujari",
        "issueId": "-5wBeIF4H",
        "createdOn": "2019-01-17T18:52:16.000Z",
        "comment": "wassup fellas",
        "commentId": "elnytq59G"
    }
}
   * 
   */

    // params: issueId, authToken
    app.get(`${baseUrl}/commentBy/:issueId`, auth.isAuthorized, commentsController.getCommentByIssueId)
    /**
   * @apiGroup comments
   * @apiVersion  1.0.0
   * @api {get} /api/v1/comments/commentBy/:issueId api for Fetching Comments By Issue ID.
   * 
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} issueId Issue ID of the Issue. (body params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "comment found",
    "status": 200,
    "data": [
        {
            "commentedByName": "Akash Pujari",
            "issueId": "-5wBeIF4H",
            "createdOn": "2019-01-17T18:52:16.000Z",
            "comment": "wassup fellas",
            "commentId": "elnytq59G"
        },
        {
            "commentedByName": "Rahul Punse",
            "issueId": "-5wBeIF4H",
            "createdOn": "2019-01-17T17:33:56.000Z",
            "comment": "sdf",
            "commentId": "HXDsCnfWbn"
        }

    ]
}
   */

    //  params: commentId, authToken
    app.delete(`${baseUrl}/delete/:commentId`, auth.isAuthorized, commentsController.deleteComment)
    /**
   * @apiGroup comments
   * @apiVersion  1.0.0
   * @api {delete} /api/v1/comments/commentBy/:issueId api for Deleting single comment.
   * 
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} commentId Comment ID of the Issue. (body params) (required) 
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "comment deleted successfully",
    "status": 200,
    "data": {
        "commentedByName": "Rahul Punse",
        "issueId": "-5wBeIF4H",
        "createdOn": "2019-01-17T17:31:41.000Z",
        "comment": "dfgdfg",
        "commentId": "bgdvGMJKk"
    }
}
   */
}

module.exports = {
    setRouter: setRouter
}