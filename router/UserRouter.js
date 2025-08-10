const Router = require('express').Router();
const { UserAuthCheck } = require('../middleware/UserAuthCheckMiddleware');
const { AddUserAction, CreateUserAction, UpdateUserAction, UpdateUserFormAction, DeleteUserAction } = require('../controller/UserController');



Router.get('/add-user', UserAuthCheck, AddUserAction);
Router.get('/update-user-form', UserAuthCheck, UpdateUserFormAction);
Router.get('/delete-user', UserAuthCheck, DeleteUserAction);

// Post 
Router.post('/create-user', UserAuthCheck, CreateUserAction);
Router.post('/update-user', UserAuthCheck, UpdateUserAction);

module.exports = Router