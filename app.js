var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);

var index = require('./routes/index');
var users = require('./routes/users');
var qiniu = require('./routes/qiniu');
var tls = require('./routes/tls');
var heartbeat = require('./routes/heartbeat');
var push = require('./routes/push');
var app = express();

var log4js = require('log4js');

log4js.configure({
  appenders: {
    out: { type: 'console' },
    task: {
      type: 'dateFile',
      filename: 'logs/task',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: [ 'out' ], level: 'info' },
    task: { appenders: [ 'task' ], level: 'info' }
  }
});
// //app.use(log4js.connectLogger(logger('normal'), {level:'auto', format:':method :url'}));
const logger = log4js.getLogger('console');
console.log = logger.info.bind(logger);

var elogger = log4js.getLogger('express');
app.use(log4js.connectLogger(elogger, { level: 'info' }));

//module.exports.logger = logger;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  store: new redisStore({
    host: "127.0.0.1",
    port: 6379,
  }),
  secret: 'somesecrettoken'
}));

app.get('/', function (req, res) {

  if(req.session.isVisit) {
    req.session.isVisit++;
    res.send('<p>第 ' + req.session.isVisit + '次来到此页面</p>');
  } else {
    req.session.isVisit = 1;
    res.send('欢迎第一次来这里');
  }
});


// app.use('/', index);
app.use('/heartbeat', heartbeat);
app.use('/push', push);
app.use('/users', users);
app.use('/qiniu', qiniu);
app.use('/tls', tls);
// catch 404 and forward to error handler
// 如果以上的路由都没有匹配，则返回错误handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //如果err.status未定义，则返回500 否则返回404
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
