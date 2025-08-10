const Router = require('express').Router();
const { LoginFormAction, UserLoginAction } = require('../controller/UserLoginController');

// Get
Router.get('/login', LoginFormAction);


// Post
Router.post('/user-login', UserLoginAction);


module.exports = Router;