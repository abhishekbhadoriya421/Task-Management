const Router = require('express').Router();
const { DashboardAction } = require('../controller/UserController');
const authRouter = require('./AuthRouter');
const userRouter = require('./UserRouter');


// Get
Router.get('/', (req, res) => { res.redirect('/dashboard') })
Router.get('/dashboard', DashboardAction);


//Router
Router.use('/user', userRouter);
Router.use('/auth', authRouter);




module.exports = Router