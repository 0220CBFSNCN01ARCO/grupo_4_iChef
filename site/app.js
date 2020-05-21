let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let methodOverride = require('method-override');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let productRouter = require('./routes/product');
let registerRouter = require('./routes/register');
let infoRouter  = require('./routes/info');

let logMiddleware = require('./middleware/logMiddleware');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', logMiddleware ,indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/register', registerRouter);
app.use('/info',infoRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  console.log(req.url);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
