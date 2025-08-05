const express = require('express');
const port = 3000;
const app = express();
require('dotenv').config();
const connectDb =  require('./config/db');
const routerIndex = require('./router/index');
connectDb();

app.use(express.urlencoded({extended:true})); // to handle form data
app.set('view engine','ejs');



app.use('/',routerIndex);


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});