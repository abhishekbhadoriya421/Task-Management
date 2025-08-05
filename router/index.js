const Router = require('express').Router();
const {DashboardAction,AddUserAction,CreateUserAction,UpdateUserAction,UpdateUserFormAction,DeleteUserAction} = require('../controller/UserController');


// Get
Router.get('/dashboard',DashboardAction);
Router.get('/add-user',AddUserAction);
Router.get('/update-user-form',UpdateUserFormAction);
Router.get('/delete-user',DeleteUserAction);

// Post 
Router.post('/create-user',CreateUserAction);
Router.post('/update-user',UpdateUserAction);

module.exports = Router