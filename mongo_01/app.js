var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// mongoDB에 접속할 수 있는 Connection을 설정해주기
var mongoose = require("mongoose")
// mongoose에서 Connection정보 얻어오기
var dbConnection = mongoose.connection

// dbConnection정보에 event handler 설정

// 1. db 연결과정에서 오류가 발생하면 실행될 함수 선언
dbConnection.on("error", function(){
  // 오류가 발생하면 오류정보를 console에 보여라
  console.error
})
// 2. db연결이 성공하면 실행될 함수를 선언
// once : db 연결 시도 후 정상적으로 연결이 되면 최초 한번만 실행되고 
// 그 다음부터는 실행되지 않음
dbConnection.once("open", function(){
  console.log("MongoDB OPEN SUCCESS!")
})

mongoose.connect("mongodb://localhost/mydb")


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memberRouter = require('./routes/memberRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/member', memberRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
