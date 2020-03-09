// 미들웨어 설정 부분
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose')

// mongoDB db연결 객체생성
var dbConnection = mongoose.connection

dbConnection.on('error', function(){
  console.err
})

// once : db를 연결할때 최초 한번만 감시를 하고 이후 연결이 유지되면 더이상 감시x
dbConnection.once('open', function(){
  console.log('**(ONCE)MONGODB CONNECTED SUCCESFULLY**')
})

dbConnection.on('disconnected', function(){
  console.log('**MONGODB CONNECTION CLOSED**')
})

dbConnection.on('connected', function(){
  console.log('**MONGODB CONNECTED**')
})

// 실제 CONNECTION 생성 부분
mongoose.connect('mongodb://localhost/mydb')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// myRouter를 사용하기 위해서 myRouter라는 이름의 객체 생성
var myRouter = require('./routes/myRouter')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book', myRouter)

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
