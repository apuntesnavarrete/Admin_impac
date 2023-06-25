var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var lessMiddleware = require('less-middleware');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//No modificar configuracion de arriba // 


var indexRouter = require('./routes/index');

// Rutas jugadores y equipos// 
var Jugadores = require('./routes/jugadores/jugadores');
var Equipos = require('./routes/Equipos/Equipos');
let nuevas_table = require('./routes/new/new');

// Configuración de Passport.js
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === process.env.DB_USERNAME && password === process.env.DB_PASSWORD) {
      return done(null, { id: 1, username: username });
    } else {
      return done(null, false);
    }
  }
));





var app = express();

app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la estrategia local
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === process.env.DB_USERNAME && password === process.env.DB_PASSWORD) {
      return done(null, { id: 1, username: username });
    } else {
      return done(null, false);
    }
  }
));

// Serialización y deserialización del usuario
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Aquí deberías obtener los datos del usuario a partir de su ID almacenado en tu base de datos
  const user = { id: 1, username: process.env.DB_USERNAME };
  done(null, user);
});


app.use('/new', nuevas_table);

//Ruta jugadores y equipos//
app.use('/Jugadores', Jugadores);
app.use('/Equipos', Equipos);

// Rutas de ligas (EJECUTARLAS) //

app.use('/', indexRouter);

app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send('Inicio de sesión exitoso');
});


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
