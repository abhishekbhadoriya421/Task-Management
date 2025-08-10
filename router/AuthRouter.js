const Router = require('express').Router();
const { LoginFormAction, SignUpFormAction, CreateUserAction, UserLoginAction, LogOutAction } = require('../controller/UserLoginController');

// Get
Router.get('/login', LoginFormAction);
Router.get('/sign-up', SignUpFormAction);
Router.get('/log-out', LogOutAction);



Router.post('/user-create', CreateUserAction);
Router.post('/user-login', UserLoginAction);


module.exports = Router;