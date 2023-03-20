var express = require('express');
var router = express.Router();
const pool = require('../database');


let servidor = "http://localhost:8082/";
let StyleSheet = "index.less"
let Menu_jugadores = "Jugadores"
let Menu_Equipos = "Equipos"
let Menu_Sancionados = "Sancionados"


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

  res.render('home', { StyleSheet , title , titulo_card, Menu, Menu_jugadores , Menu_Equipos , Menu_Sancionados});
});

router.get('/ED', function(req, res, next) {
  let title = "Ed"
  const link = `${servidor}${title}/`;

  let categorias = ["Libre", "Mixta" , "Femenil",  "Sub21"]

  let Menu = categorias.map(categoria => {
    return {
      option: categoria,
      link: link + categoria
    };
  });

  res.render('home', { StyleSheet , title , titulo_card:title , Menu , Menu_jugadores,Menu_Equipos , Menu_Sancionados});
});



router.get('/Aguigol', function(req, res, next) {

  let title = "Aguigol"
  const link = `${servidor}${title}/`;

  let categorias = ["Sub22", "Libre" , "Mixta"]

  let Menu = categorias.map(categoria => {
    return {
      option: categoria,
      link: link + categoria
    };
  });

console.log(Menu)

res.render('home', { StyleSheet , title , titulo_card:title , Menu , Menu_jugadores,Menu_Equipos , Menu_Sancionados});

});

router.get('/Pro', function(req, res, next) {
  let title = "Pro"
  const link = `${servidor}${title}/`;

  let categorias = ["Sub22", "Libre" , "Mixta" , "Femenil" , "Sub18"]

  let Menu = categorias.map(categoria => {
    return {
      option: categoria,
      link: link + categoria
    };
  });
res.render('home', { StyleSheet , title , titulo_card:title , Menu , Menu_jugadores,Menu_Equipos , Menu_Sancionados});

});


router.get('/gemelas', function(req, res, next) {
  let title = "Gemelas"
  const link = `${servidor}${title}/`;

  let categorias = ["Sub-22", "Libre" , "Mixta" , "Femenil"]

  let Menu = categorias.map(categoria => {
    return {
      option: categoria,
      link: link + categoria
    };
  });


res.render('home', { StyleSheet , title , titulo_card:title , Menu,Menu_jugadores,Menu_Equipos , Menu_Sancionados});
});




module.exports = router;
