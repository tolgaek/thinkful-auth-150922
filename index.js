'use strict';

var express = require('express');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var app = express();

app.use(session({ secret: 'SOMETHINGSUPERSECRET' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: '548770298027-6imrmo0s4sfatogovec2i9bsvr6ld1b4.apps.googleusercontent.com',
  clientSecret: 'LCO5o5_wI4PrMSviODLJHn8H',
  callbackURL: 'http://127.0.0.1:8060/authenticate/callback'
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

app.get('/', function(req, res, next) {
  res.send('<a href="/authenticate">Log in here</a>');
});

app.get('/display', function(req, res, next) {
  if (req.user) {
    res.send('You are ' + req.user.displayName + ', and I claim my $1 million');
  } else {
    res.redirect('/');
  }
});

app.get('/authenticate', passport.authenticate('google', {
  scope: 'https://www.googleapis.com/auth/userinfo.profile'
}));

app.get('/authenticate/callback', passport.authenticate('google', {
  successRedirect: '/display',
  failureRedirect: '/'
}));

app.listen(8060);
