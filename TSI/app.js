const express = require('express');
//const cookieParser = require('cookie-parser');
//const logger = require('morgan');
const fs = require('fs');
const upload = require('express-fileupload');


const indexRouter = require('./routes/index');
const uploadRouter = require('./routes/upload');
const rateRouter = require('./routes/rate');
const filesRouter = require('./routes/files');


const utils = require('./routes/utils');

const app = express();

app.use(upload());


const hbs = require("hbs");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");



if (!fs.existsSync(utils.uploadsDir)){
    fs.mkdirSync(utils.uploadsDir);
}


app.use('/', indexRouter);
app.use('/upload/', uploadRouter);
app.use('/rate/', rateRouter);
app.use('/files/', filesRouter);


module.exports = app;
