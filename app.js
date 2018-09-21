var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var categoryRouter = require('./routes/category.route');
var productRouter = require('./routes/product.route');
var storeRouter = require('./routes/store.route');
var app = express();
var config = require('./config/database');
var mongoose = require('mongoose');
mongoose.connect(config.localConnectionStr,{
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
// MIDDLE WARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist/toy-store')));
app.use('/', express.static(path.join(__dirname, 'dist/toy-store')));

// ROUTES
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api', storeRouter);
// Delegate routing for angular
app.use('**', (req, res) => {
  res.sendFile(__dirname + '/dist/toy-store/index.html');
});

// CATCH ERRORS
app.use(function(req, res, next) {
  next(createError(404));
});

// ERROR HANDLER
app.use(function(err, req, res, next) {
  // set locals, only providing errors in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;
