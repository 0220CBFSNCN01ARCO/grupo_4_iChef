let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let methodOverride = require('method-override');
let session = require('express-session');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let productRouter = require('./routes/product');
let infoRouter  = require('./routes/info');
let configRouter  = require('./routes/config');
let cartRouter  = require('./routes/cart');
/*ROUTER API*/
let apiUsersRouter = require('./routes/api/users');
let apiProductRouter = require('./routes/api/products');
let apiCategoriesRouter = require('./routes/api/categories');

let logMiddleware = require('./middleware/logMiddleware');
let recordameMiddleware = require ('./middleware/recordameMiddleware');

const config = require('./controllers/Config');
const Security = require('./controllers/Security');

let app = express();

require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({secret: process.env.SESION_SECRET,
                  resave: false,
                  saveUninitialized: true,
                  unset: 'destroy',
                  name: config.name + '-' + Security.generateId(),
                  genid: (req) => {return Security.generateId()}
}));

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.use(recordameMiddleware);

app.use('/', logMiddleware ,indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/info',infoRouter);
app.use('/config',configRouter);
app.use('/cart',cartRouter);
/*API*/
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductRouter);
app.use('/api/categories', apiCategoriesRouter);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

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
  res.render('error', { title: 'Error',
                        usuario: req.session.usuarioLogueado });
});

module.exports = app;
