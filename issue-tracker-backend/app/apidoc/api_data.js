define({ "api": [
  {
    "group": "comments",
    "version": "1.0.0",
    "type": "delete",
    "url": "/api/v1/comments/commentBy/:issueId",
    "title": "api for Deleting single comment.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "commentId",
            "description": "<p>Comment ID of the Issue. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"comment deleted successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"commentedByName\": \"Rahul Punse\",\n        \"issueId\": \"-5wBeIF4H\",\n        \"createdOn\": \"2019-01-17T17:31:41.000Z\",\n        \"comment\": \"dfgdfg\",\n        \"commentId\": \"bgdvGMJKk\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/CommentsRoutes.js",
    "groupTitle": "comments",
    "name": "DeleteApiV1CommentsCommentbyIssueid"
  },
  {
    "group": "comments",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/comments/commentBy/:issueId",
    "title": "api for Fetching Comments By Issue ID.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue ID of the Issue. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"comment found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"commentedByName\": \"Akash Pujari\",\n            \"issueId\": \"-5wBeIF4H\",\n            \"createdOn\": \"2019-01-17T18:52:16.000Z\",\n            \"comment\": \"wassup fellas\",\n            \"commentId\": \"elnytq59G\"\n        },\n        {\n            \"commentedByName\": \"Rahul Punse\",\n            \"issueId\": \"-5wBeIF4H\",\n            \"createdOn\": \"2019-01-17T17:33:56.000Z\",\n            \"comment\": \"sdf\",\n            \"commentId\": \"HXDsCnfWbn\"\n        }\n\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/CommentsRoutes.js",
    "groupTitle": "comments",
    "name": "GetApiV1CommentsCommentbyIssueid"
  },
  {
    "group": "comments",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/comments/createComment",
    "title": "api for Creating New Comment.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue ID of the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "commentedByName",
            "description": "<p>Commentor of the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment of the comment. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"comment created successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"5c40cee0fba8c93aa7da259d\",\n        \"commentedByName\": \"Akash Pujari\",\n        \"issueId\": \"-5wBeIF4H\",\n        \"createdOn\": \"2019-01-17T18:52:16.000Z\",\n        \"comment\": \"wassup fellas\",\n        \"commentId\": \"elnytq59G\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/CommentsRoutes.js",
    "groupTitle": "comments",
    "name": "PostApiV1CommentsCreatecomment"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/createIssue",
    "title": "api for fetching all issues by assignee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"all issues found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"createdOn\": \"2019-01-17T19:10:02.000Z\",\n            \"status\": \"in-test\",\n            \"assignee\": \"7emnEob6_\",\n            \"reporterId\": \"sVZyR9jBy\",\n            \"reporter\": \"Hernandes Xavier\",\n            \"description\": \"Bastic\",\n            \"title\": \"Boom\",\n            \"screenshot\": \"1547752202836_Screenshot from 2019-01-04 00-18-26.png\",\n            \"issueId\": \"lP08L9RkE\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/IssueRoutes.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueCreateissue"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/getAllIssues",
    "title": "api getting all issues.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"all issues found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"createdOn\": \"2019-01-17T17:28:30.000Z\",\n            \"status\": \"backlog\",\n            \"assignee\": \"oA9q-v_r0\",\n            \"reporterId\": \"oA9q-v_r0\",\n            \"reporter\": \"Ninad Lohar\",\n            \"description\": \"dsf\",\n            \"title\": \"sdf\",\n            \"screenshot\": \"\",\n            \"issueId\": \"-5wBeIF4H\"\n        },\n        {\n            \"createdOn\": \"2019-01-17T19:10:02.000Z\",\n            \"status\": \"in-test\",\n            \"assignee\": \"7emnEob6_\",\n            \"reporterId\": \"sVZyR9jBy\",\n            \"reporter\": \"Hernandes Xavier\",\n            \"description\": \"Bastic\",\n            \"title\": \"Boom\",\n            \"screenshot\": \"1547752202836_Screenshot from 2019-01-04 00-18-26.png\",\n            \"issueId\": \"lP08L9RkE\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/IssueRoutes.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueGetallissues"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/getIssuesByAssignee/:assignee",
    "title": "api for fetching all issues by assignee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assignee",
            "description": "<p>Assignee ID of the user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Issue Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5c40bb3e5763951e01d12ab7\",\n            \"__v\": 0,\n            \"createdOn\": \"2019-01-17T17:28:30.000Z\",\n            \"status\": \"backlog\",\n            \"assignee\": \"7emnEob6_\",\n            \"reporterId\": \"oA9q-v_r0\",\n            \"reporter\": \"Ninad Lohar\",\n            \"description\": \"well played\",\n            \"title\": \"NewBie\",\n            \"screenshot\": \"\",\n            \"issueId\": \"-5wBeIF4H\"\n        },\n        {\n            \"_id\": \"5c40d30a7b1232404f885aab\",\n            \"__v\": 0,\n            \"createdOn\": \"2019-01-17T19:10:02.000Z\",\n            \"status\": \"in-test\",\n            \"assignee\": \"7emnEob6_\",\n            \"reporterId\": \"sVZyR9jBy\",\n            \"reporter\": \"Hernandes Xavier\",\n            \"description\": \"Bastic\",\n            \"title\": \"Boom\",\n            \"screenshot\": \"1547752202836_Screenshot from 2019-01-04 00-18-26.png\",\n            \"issueId\": \"lP08L9RkE\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/IssueRoutes.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueGetissuesbyassigneeAssignee"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/getSingleIssue/:issueId",
    "title": "api for fetching single issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>IssueId of the Issue. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Issue Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"createdOn\": \"2019-01-17T17:28:30.000Z\",\n            \"status\": \"backlog\",\n            \"assignee\": \"7emnEob6_\",\n            \"reporterId\": \"oA9q-v_r0\",\n            \"reporter\": \"Ninad Lohar\",\n            \"description\": \"well played\",\n            \"title\": \"NewBie\",\n            \"screenshot\": \"\",\n            \"issueId\": \"-5wBeIF4H\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/IssueRoutes.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueGetsingleissueIssueid"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/issue/createIssue",
    "title": "api for creating new issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the Issue. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Issue. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reporter",
            "description": "<p>Reporter of the Issue. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reporterId",
            "description": "<p>Reporter Id of the Issue. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assignee",
            "description": "<p>Assignee of the Issue. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the Issue. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "screenshot",
            "description": "<p>Screenshot of the Issue. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n    \"error\": false,\n    \"message\": 'issue successfully created',\n    \"status\": 200,\n    \"data\": { \n        \"__v\": 0,\n        \"_id\": \"5c40d30a7b1232404f885aab\",\n        \"createdOn\": \"2019-01-17T19:10:02.000Z\",\n        \"status\": 'in-test',\n        \"assignee\": '7emnEob6_',\n        \"reporterId\": 'sVZyR9jBy',\n        \"reporter\": 'Hernandes Xavier',\n        \"description:: 'Bastic',\n        \"title\": 'Boom',\n        \"screenshot\": '1547752202836_Screenshot from 2019-01-04 00-18-26.png',\n        \"issueId\": 'lP08L9RkE' \n    } \n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/IssueRoutes.js",
    "groupTitle": "issue",
    "name": "PostApiV1IssueCreateissue"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/issue/updateIssue/:issueId",
    "title": "api for updating single issues.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assignee",
            "description": "<p>Assignee of the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "screenshot",
            "description": "<p>Screenshot of the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>IssueId of the Issue. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n    \"error\": false,\n    \"message\": 'issue updated',\n    \"status\": 200,\n    \"data\": { \n        n: 1, \n        nModified: 1,\n        ok: 1 \n    } \n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/IssueRoutes.js",
    "groupTitle": "issue",
    "name": "PutApiV1IssueUpdateissueIssueid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/view/all",
    "title": "api for Get all Registered Users.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authtoken of logged in user. (header params/body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All User Details Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"email\": \"tavkqqzd@gmail.com\",\n            \"createdOn\": \"2019-01-02T17:34:53.000Z\",\n            \"password\": \"$2a$10$nt.AsZTraOWSPxst1WdjZOe4KSEk.BzI3oDUp2.hTFbNh3JzWX78O\",\n            \"mobileNumber\": 12345,\n            \"lastName\": \"Lohar\",\n            \"userId\": \"oA9q-v_r0\",\n            \"firstName\": \"Ninad\"\n        },\n        {\n            \"email\": \"ninad.lohar94@gmail.com\",\n            \"createdOn\": \"2019-01-02T19:22:12.000Z\",\n            \"password\": \"$2a$10$Oa86eurbxkXesryJfei8Qe5TobqNllkgta7janPP3uofvipnKZFVu\",\n            \"mobileNumber\": 111,\n            \"lastName\": \"Punse\",\n            \"userId\": \"7emnEob6_\",\n            \"firstName\": \"Rahul\"\n        }\n\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersViewAll"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "api for Forgot Password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"email send successfully for password reset\",\n    \"status\": 200,\n    \"data\": {\n        \"error\": false,\n        \"message\": \"email sent successfully for reseting the password\",\n        \"status\": 200,\n        \"data\": \"email sent\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for Login User.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkxWMUhvT0VQYyIsImlhdCI6MTU0Nzc0ODM1NTMxNiwiZXhwIjoxNTQ3ODM0NzU1LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7ImVtYWlsIjoidGF2a3FxemQyMUBnbWFpbC5jb20iLCJtb2JpbGVOdW1iZXIiOjEyMzQ1Njc4OTAsImxhc3ROYW1lIjoiTG9oYXIiLCJ1c2VySWQiOiJ6XzZHXzNFbUgiLCJmaXJzdE5hbWUiOiJOaW5hZCJ9fQ.jfZFAu-0x0kbGJBWKvRBXGNltkJBUuwmS_i7z4AZ5Xg\",\n        \"userDetails\": {\n            \"email\": \"tavkqqzd21@gmail.com\",\n            \"mobileNumber\": 1234567890,\n            \"lastName\": \"Lohar\",\n            \"userId\": \"z_6G_3EmH\",\n            \"firstName\": \"Ninad\"\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout/:userId",
    "title": "api for Logging Out User.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authtoken of logged in user. (header params/body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>User ID of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogoutUserid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/resetPassword",
    "title": "api for Reset Password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>ConfirmPassword of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ error: false,\n    \"message\": 'email successfully reset',\n    \"status\": 200,\n    \"data\": { \n        \"error\": false,\n        \"message\": \"password reset successfull\",\n        \"status\": 200,\n        \"data\": \"password reset successfull\" \n    } \n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersResetpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for Registering User.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"email\": \"tavkqqzd21@gmail.com\",\n        \"_id\": \"5c40c2151e14122cf511f802\",\n        \"createdOn\": \"2019-01-17T17:57:41.000Z\",\n        \"mobileNumber\": 1234567890,\n        \"lastName\": \"Lohar\",\n        \"userId\": \"z_6G_3EmH\",\n        \"firstName\": \"Ninad\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "watcher",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/getAllWatchers/:issueId",
    "title": "api for getting all watchers of issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueID",
            "description": "<p>Issue ID of the Issue. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"All Watchers Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"watcherName\": \"Ninad Lohar\",\n            \"typeOfUpdate\": \"create issue\",\n            \"title\": \"sdf\",\n            \"issueId\": \"-5wBeIF4H\",\n            \"watcherId\": \"oA9q-v_r0\"\n        },\n        {\n            \"watcherName\": \"Hernandes Xavier\",\n            \"typeOfUpdate\": \"comment\",\n            \"title\": \"sdf\",\n            \"issueId\": \"-5wBeIF4H\",\n            \"watcherId\": \"sVZyR9jBy\"\n        }\n\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/WatcherRoute.js",
    "groupTitle": "watcher",
    "name": "GetApiV1GetallwatchersIssueid"
  },
  {
    "group": "watcher",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/watcher/add",
    "title": "api for adding watcher.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "watcherId",
            "description": "<p>Watcher ID of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "watcherName",
            "description": "<p>Watcher Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueID",
            "description": "<p>Issue ID of the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "typeOfUpdate",
            "description": "<p>Type of Update for the Issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": \"add watcher\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"5c40cc1c5f2e2538277e504c\",\n        \"watcherName\": \"Xavier Hernandes\",\n        \"typeOfUpdate\": \"comment\",\n        \"title\": \"aatish\",\n        \"issueId\": \"-5wBeIF4H\",\n        \"watcherId\": \"oA9q-v_r0\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/WatcherRoute.js",
    "groupTitle": "watcher",
    "name": "PostApiV1WatcherAdd"
  }
] });
