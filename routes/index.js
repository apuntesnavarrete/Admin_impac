var express = require('express');
var router = express.Router();

let servidor = "http://localhost:8082/";
let StyleSheet = "index.less"


/* GET home page. */
router.get('/', function(req, res, next) {


  let Menu = [
    { option: 'ED', link:servidor + "ED"},
    { option: 'Aguigol', link:servidor + "Aguigol"},
    { option: 'Gemelas', link:servidor + "Gemelas"},
    { option: 'Pro', link:servidor + "Pro"},
];
 

  let title = "Principal"
  let titulo_card = "Impacto"

  res.render('home', { StyleSheet , title , titulo_card, Menu});
});

router.get('/ED', function(req, res, next) {
  let title = "Ed"
  let link = servidor + title + "/";

  let categorias = ["Libre", "Mixta" , "Femenil"]

  let Menu = [
    { option: categorias[0] , link:link + categorias[0]},
    { option: categorias[1] , link:link + categorias[1]},
    { option: categorias[2] , link:link + categorias[2]},
];

  res.render('home', { StyleSheet , title , titulo_card:title , Menu});
});



router.get('/Aguigol', function(req, res, next) {

  let title = "Aguigol"
  let link = servidor + title + "/";

  let categorias = ["Sub-22", "Libre" , "Mixta"]

  let Menu = [
    { option: categorias[0] , link:link + categorias[0]},
    { option: categorias[1] , link:link + categorias[1]},
    { option: categorias[2] , link:link + categorias[2]},
];
res.render('home', { StyleSheet , title , titulo_card:title , Menu});

});

router.get('/Pro', function(req, res, next) {
  let title = "Pro"
  let link = servidor + title + "/";

  let categorias = ["Sub-22", "Libre" , "Mixta" , "Femenil"]

  let Menu = [
    { option: categorias[0] , link:link + categorias[0]},
    { option: categorias[1] , link:link + categorias[1]},
    { option: categorias[2] , link:link + categorias[2]},
    { option: categorias[3] , link:link + categorias[3]},

];
res.render('home', { StyleSheet , title , titulo_card:title , Menu});

});


router.get('/gemelas', function(req, res, next) {
  let title = "Gemelas"
  let link = servidor + title + "/";

  let categorias = ["Sub-22", "Libre" , "Mixta" , "Femenil"]

  let Menu = [
    { option: categorias[0] , link:link + categorias[0]},
    { option: categorias[1] , link:link + categorias[1]},
    { option: categorias[2] , link:link + categorias[2]},
    { option: categorias[3] , link:link + categorias[3]},

];

res.render('home', { StyleSheet , title , titulo_card:title , Menu});
});



module.exports = router;