const userController = require('../controllers/UserController');
const appConfig = require('./../../config/appConfig')
const auth = require('../middlewares/auth')

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/users`;

    // params: firstName, lastName, email, password , mobileNumber.
    app.post(`${baseUrl}/signup`, userController.signUpFunction);
    /**
   * @apiGroup users
   * @apiVersion  1.0.0
   * @api {post} /api/v1/users/signup api for Registering User.
   * 
   * @apiParam {string} firstName First Name of the user. (body params) (required)
   * @apiParam {string} lastName Last Name of the user. (body params) (required)
   * @apiParam {string} email Email of the user. (body params) (required)
   * @apiParam {string} password Password of the user. (body params) (required)
   * @apiParam {string} mobileNumber Mobile Number of the user. (body params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "User created",
    "status": 200,
    "data": {
        "__v": 0,
        "email": "tavkqqzd21@gmail.com",
        "_id": "5c40c2151e14122cf511f802",
        "createdOn": "2019-01-17T17:57:41.000Z",
        "mobileNumber": 1234567890,
        "lastName": "Lohar",
        "userId": "z_6G_3EmH",
        "firstName": "Ninad"
    }
}
   */

    // params: email, password
    app.post(`${baseUrl}/login`, userController.loginFunction);
    /**
   * @apiGroup users
   * @apiVersion  1.0.0
   * @api {post} /api/v1/users/login api for Login User.
   * 
   * @apiParam {string} email Email of the user. (body params) (required)
   * @apiParam {string} password Password of the user. (body params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "Login Successful",
    "status": 200,
    "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkxWMUhvT0VQYyIsImlhdCI6MTU0Nzc0ODM1NTMxNiwiZXhwIjoxNTQ3ODM0NzU1LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7ImVtYWlsIjoidGF2a3FxemQyMUBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjEyMzQ1Njc4OTAsImxhc3ROYW1lIjoiTG9oYXIiLCJ1c2VySWQiOiJ6XzZHXzNFbUgiLCJmaXJzdE5hbWUiOiJOaW5hZCJ9fQ.jfZFAu-0x0kbGJBWKvRBXGNltkJBUuwmS_i7z4AZ5Xg",
        "userDetails": {
            "email": "tavkqqzd21@gmail.com",
            "mobileNumber": 1234567890,
            "lastName": "Lohar",
            "userId": "z_6G_3EmH",
            "firstName": "Ninad"
        }
    }
}
   * 
   */

    // params: authToken, userId
    app.post(`${baseUrl}/logout/:userId`, userController.logout);
    /**
   * @apiGroup users
   * @apiVersion  1.0.0
   * @api {post} /api/v1/users/logout/:userId api for Logging Out User.
   * 
   * @apiParam {string} authToken Authtoken of logged in user. (header params/body params) (required)
   * @apiParam {string} userId User ID of the user. (body params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "Logged Out Successfully",
    "status": 200,
    "data": null
}
   */

    // params: email
    app.post(`${baseUrl}/forgotPassword`, userController.forgotPassword)
    /**
   * @apiGroup users
   * @apiVersion  1.0.0
   * @api {post} /api/v1/users/forgotPassword api for Forgot Password.
   * 
   * @apiParam {string} email Email of the user. (body params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "email send successfully for password reset",
    "status": 200,
    "data": {
        "error": false,
        "message": "email sent successfully for reseting the password",
        "status": 200,
        "data": "email sent"
    }
}
   */

    // params: confirmPassword, password
    app.post(`${baseUrl}/resetPassword`, userController.resetPassword)
    /**
   * @apiGroup users
   * @apiVersion  1.0.0
   * @api {post} /api/v1/users/resetPassword api for Reset Password.
   * 
   * @apiParam {string} password Password of the user. (body params) (required)
   * @apiParam {string} confirmPassword ConfirmPassword of the user. (body params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * { error: false,
    "message": 'email successfully reset',
    "status": 200,
    "data": { 
        "error": false,
        "message": "password reset successfull",
        "status": 200,
        "data": "password reset successfull" 
    } 
}
   */

    // params: authToken
    app.get(`${baseUrl}/view/all`, auth.isAuthorized, userController.getAllUsers)
    /**
   * @apiGroup users
   * @apiVersion  1.0.0
   * @api {get} /api/v1/users/view/all api for Get all Registered Users.
   * 
   * @apiParam {string} authToken Authtoken of logged in user. (header params/body params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "All User Details Found",
    "status": 200,
    "data": [
        {
            "email": "tavkqqzd@gmail.com",
            "createdOn": "2019-01-02T17:34:53.000Z",
            "password": "$2a$10$nt.AsZTraOWSPxst1WdjZOe4KSEk.BzI3oDUp2.hTFbNh3JzWX78O",
            "mobileNumber": 12345,
            "lastName": "Lohar",
            "userId": "oA9q-v_r0",
            "firstName": "Ninad"
        },
        {
            "email": "ninad.lohar94@gmail.com",
            "createdOn": "2019-01-02T19:22:12.000Z",
            "password": "$2a$10$Oa86eurbxkXesryJfei8Qe5TobqNllkgta7janPP3uofvipnKZFVu",
            "mobileNumber": 111,
            "lastName": "Punse",
            "userId": "7emnEob6_",
            "firstName": "Rahul"
        }

    ]
}
   */

}

module.exports = {
    setRouter: setRouter
}