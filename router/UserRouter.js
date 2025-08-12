const Router = require('express').Router();
// const { UserAuthCheck } = require('../middleware/UserAuthCheckMiddleware');
const { CheckAdminUserTypeMiddleware } = require('../middleware/CheckAdminUserTypeMiddleware');
const { AddUserAction, CreateUserAction, UpdateUserAction, UpdateUserFormAction, DeleteUserAction } = require('../controller/UserController');



Router.get('/add-user', CheckAdminUserTypeMiddleware, AddUserAction);
Router.get('/update-user-form', CheckAdminUserTypeMiddleware, UpdateUserFormAction);
Router.get('/delete-user', CheckAdminUserTypeMiddleware, DeleteUserAction);

// Post 
Router.post('/create-user', CheckAdminUserTypeMiddleware, CreateUserAction);
Router.post('/update-user', CheckAdminUserTypeMiddleware, UpdateUserAction);

module.exports = Router