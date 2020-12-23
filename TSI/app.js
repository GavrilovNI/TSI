const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



const upload = require('express-fileupload');


const indexRouter = require('./routes/index');
const uploadRouter = require('./routes/upload');
const rateRouter = require('./routes/rate');
const filesRouter = require('./routes/files');


//const http = require("http");
//const WebSocket = require( "ws");


const app = express();


app.use(upload()); // Don't forget this line!
//const jsonParser = express.json();


const hbs = require("hbs");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");




app.use('/', indexRouter);
app.use('/upload/', uploadRouter);
app.use('/rate/', rateRouter);
app.use('/files/', filesRouter);


module.exports = app;
