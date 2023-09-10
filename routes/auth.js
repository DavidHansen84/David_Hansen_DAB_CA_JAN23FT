var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var db = require("../models");
var UserService = require("../services/UserService");
var userService = new UserService(db);

passport.use(new LocalStrategy(function verify(username, password, cb) {
  console.log('Inside verify function');
  userService.getOneByName(username).then((data) => {
    if (data.Username === username) {
      console.log("Username match");
    }
    if (data === null) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    if (data.Password !== password) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, data, { message: 'Logged in'});
  });
}));

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.Id, username: user.Username, role: user.Role });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});


var router = express.Router();

router.get('/login', function(req, res, next) {
  
  const user = req.user;
  console.log('User:', user);
  res.render('login', { user });
});

router.post('/login/password', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.post('/signup', function (req, res, next) {
  userService.create(req.body.firstname, req.body.lastname, req.body.username, req.body.password)
    .then(() => {
      res.redirect('/login');
    })
    .catch((error) => {
      // Handle error
      console.error(error);
      res.redirect('/signup');
    });
});

module.exports = router;
