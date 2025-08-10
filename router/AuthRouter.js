const Router = require('express').Router();
const { LoginFormAction, SignUpFormAction, CreateUserAction } = require('../controller/UserLoginController');

// Get
Router.get('/login', LoginFormAction);
Router.get('/sign-up', SignUpFormAction);

Router.post('/user-create', CreateUserAction);


module.exports = Router;