const express = require('express');
const port = 3000;
const app = express();
require('dotenv').config();
const connectDb =  require('./config/db');
const routerIndex = require('./router/index');
const flash = require('connect-flash');
const session = require('express-session');
const {FlashMiddleware} = require('./middleware/flashMessageMiddleware');

connectDb();

app.use(express.urlencoded({extended:true})); // to handle form data
app.set('view engine','ejs');

/**
 * Set Session 
 */
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}))

/**
 * Set Flash Message
 */
app.use(flash());

app.use(FlashMiddleware);

app.use('/',routerIndex);

app.use((req,res,next)=>{
    return res.render('pageNotFound');
});
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});