var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Principal' });
});

router.get('/ligas', function(req, res, next) {
  res.render('index', { title: 'Menu ligas' });
});

router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/agui', function(req, res, next) {
  res.render('index', { title: 'aguigol' });
});

router.get('/pro', function(req, res, next) {
  res.render('index', { title: 'pro' });
});

router.get('/gemelas', function(req, res, next) {
  res.render('index', { title: 'pro' });
});

router.get('/ed', function(req, res, next) {
  res.render('home', { title: 'pro' });
});
module.exports = router;
