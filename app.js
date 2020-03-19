const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = require("./routes/index")
const methodOverride = require("method-override")

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride((req,res) =>{
  if(req.body && req.body._method){
    const method = req.body._method;
    return method;
  }
}))
app.use("/",router)


app.use(function(req, res, next) {
  next(createError(404));
});



module.exports = app;
