var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('./passport');
var unirest = require('unirest');
var methodOverride = require('method-override');
var rp = require('request-promise');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var scores = require('./routes/scores');

var app = express();

require('dotenv').load();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_KEY]
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.HOST + '/auth/facebook/callback',
}, passport.authCallback));
app.use(passport.initialize());
app.use(passport.session(app.locals.accessToken));

app.use(function(req, res, next) {
    // var accessToken = req.user ? req.user.accessToken : '';
    // rp({uri: `https://graph.facebook.com/me?access_token=${accessToken}`})
    // .then(function(){
    res.locals.user = req.user || {};
    next();
    // }).catch(function() {
    //   next();
    // });
});

app.use(unirest());

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
app.use('/scores', scores);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;