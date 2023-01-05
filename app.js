var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var lessMiddleware = require('less-middleware');

//No modificar configuracion de arriba // 


var indexRouter = require('./routes/index');

// Rutas de ligas (llamarlas)//
//ED
var EdLibre = require('./routes/ed/edLibre');
var EdFemenil = require('./routes/ed/edfemenil');
var EdMixta = require('./routes/ed/edMixta');
 //ED

 //Aguigol
var AguigolLibre = require('./routes/aguigol/aguilibre');
var AguigolSub22 = require('./routes/aguigol/aguisub22');

  //Aguigol

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Rutas de ligas (EJECUTARLAS) //

app.use('/', indexRouter);
 //ED
app.use('/Ed/Libre', EdLibre);
app.use('/Ed/Femenil', EdFemenil);
app.use('/Ed/Mixta', EdMixta);
  //ED

  //Aguigol
  app.use('/Aguigol/Libre', AguigolLibre);
  app.use('/Aguigol/Sub22', AguigolSub22);

  //Aguigol


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
