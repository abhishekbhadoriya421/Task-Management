const Router = require('express').Router();
const { LoginFormAction, UserLoginAction, LogoutAction } = require('../controller/UserLoginController');

// Get
Router.get('/login', LoginFormAction);
Router.get('/log-out', LogoutAction);


// Post
Router.post('/user-login', UserLoginAction);


module.exports = Router;