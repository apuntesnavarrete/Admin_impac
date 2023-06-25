var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var lessMiddleware = require('less-middleware');
const session = require('express-session');
require('dotenv').config();

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
  (username, password, done) => {
    // Verificar las credenciales del usuario
    if (username === process.env.VARIABLE1 && password === process.env.VARIABLE2) {
      return done(null, { username: username });
    } else {
      return done(null, false, { message: 'Credenciales inválidas' });
    }
  }
));


passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  // Obtener el usuario a partir del nombre de usuario
  const user = { username: username };
  done(null, user);
});


var app = express();

app.use(session({
  secret: process.env.USERNAME,
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


app.get('/login', (req, res) => {
  res.send(`
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Nombre de usuario" required>
      <input type="password" name="password" placeholder="Contraseña" required>
      <button type="submit">Iniciar sesión</button>
    </form>
  `);
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.get('/profile', isAuthenticated, (req, res) => {
  res.send(`Bienvenido, ${req.user.username}!`);
});

app.get('/general', isAuthenticated, (req, res) => {
    res.send(`Bienvenido a general, ${req.user.username}!`);
  });


app.use('/new',isAuthenticated, nuevas_table);

//Ruta jugadores y equipos//
app.use('/Jugadores',isAuthenticated, Jugadores);
app.use('/Equipos',isAuthenticated, Equipos);

// Rutas de ligas (EJECUTARLAS) //

app.use('/',isAuthenticated, indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Middleware de autenticación
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

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
