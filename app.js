var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var food = require('./routes/food');
var exercise = require('./routes/exercise');
var account = require('./routes/account');
var forum = require('./routes/forum');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.engine('html', require('hogan-express'));

app.set('partials', 
    {
        navbar: "partials/navbar",
        login: "partials/login",
        footer: "partials/footer"
    }
);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/food', express.static(path.join(__dirname, 'public')));
app.use('/exercise', express.static(path.join(__dirname, 'public')));
app.use('/account', express.static(path.join(__dirname, 'public')));
app.use('/account/log', express.static(path.join(__dirname, 'public')));
app.use('/account/log/date', express.static(path.join(__dirname, 'public')));
app.use('/forum', express.static(path.join(__dirname, 'public')));
app.use('/forum/threads', express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "salty",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use('/', index);
app.use('/food', food);
app.use('/exercise', exercise);
app.use('/account', account);
app.use('/forum', forum);

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
