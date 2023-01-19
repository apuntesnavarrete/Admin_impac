var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var lessMiddleware = require('less-middleware');

//No modificar configuracion de arriba // 


var indexRouter = require('./routes/index');

// Rutas jugadores y equipos// 
var Jugadores = require('./routes/jugadores/jugadores');
var Equipos = require('./routes/Equipos/Equipos');


// Rutas de ligas (llamarlas)//

// Gemelas 
let GemelasMixta = require('./routes/gemelas/Mixta');
let GemelasLibre = require('./routes/gemelas/Libre');

// Gemelas

//Pro
let ProLibre = require('./routes/pro/Libre');
let ProSub22 = require('./routes/pro/Sub22');
let ProMixta = require('./routes/pro/Mixta');
let ProFemenil = require('./routes/pro/Femenil');
let ProSub18 = require('./routes/pro/Sub18');

//Pro

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


//Ruta jugadores y equipos//
app.use('/Jugadores', Jugadores);
app.use('/Equipos', Equipos);

// Rutas de ligas (EJECUTARLAS) //

app.use('/', indexRouter);

//Gemelas

app.use('/Gemelas/Mixta', GemelasMixta);
app.use('/Gemelas/Libre', GemelasLibre);

//Gemelas


//Pro
app.use('/Pro/Sub22', ProSub22);
app.use('/Pro/Mixta', ProMixta);
app.use('/Pro/Femenil', ProFemenil);
app.use('/Pro/Sub18', ProSub18);
app.use('/Pro/Libre', ProLibre);

//Pro

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
