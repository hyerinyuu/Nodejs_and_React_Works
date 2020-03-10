var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 폴더의 index.js파일을 읽어들일때는 굳이 명시해주지 않아도
// 알아서 읽음 (== ./models/index)
// ##### ./models 폴더에 index.js 파일이 있는지 찾아서 
// 있으면 require하여 사용할 수 잇도록 준비하라
var sequelize = require('./models').sequelize

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bbsRouter = require('./routes/bbsRouter');

var app = express();

// db에 연결하라
sequelize.sync()

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
app.use('/bbs', bbsRouter);

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
