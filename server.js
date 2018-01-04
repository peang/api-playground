import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

import db from './src/common/configs/db';
import web from './src/web/routes/index';
import api from './src/api/routes/index'

var server = express();

// view engine setup
server.set('views', path.join(__dirname, '/src/web/views'));
server.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
server.use(favicon( path.join(__dirname, 'public', 'favicon.ico') ) );
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

server.use(express.static(path.join(__dirname, '/public')));

server.use('/api', api);
server.use('/', web);

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;
