const Router = require('express').Router();
const {CreateTaskFormAction} = require('../controller/TaskManagementController');

Router.get('/create-task-form',CreateTaskFormAction);


module.exports = Router;