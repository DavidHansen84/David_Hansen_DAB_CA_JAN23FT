
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require("./models");
var passport = require('passport')
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);

db.sequelize.sync({ force: false });

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var speciesRouter = require('./routes/species');
var temperamentsRouter = require('./routes/temperaments');
var usersRouter = require('./routes/users');
var sizesRouter = require('./routes/sizes');
var animalsRouter = require('./routes/animals');
var tempaniRouter = require('./routes/temperaments_animals');
var adoptionRouter = require('./routes/adoptions');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'random text',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore()
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/species', speciesRouter);
app.use('/temperament', temperamentsRouter);
app.use('/users', usersRouter);
app.use('/sizes', sizesRouter);
app.use('/animals', animalsRouter);
app.use('/tempani', tempaniRouter);
app.use('/adoptions', adoptionRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

