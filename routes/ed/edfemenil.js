
var express = require('express');
var router = express.Router();


let servidor = "http://localhost:8082/";


/* GET users listing. */
router.get('/', function(req, res, next) {
  let StyleSheet = "index.less"
  let title = "ED"
  let categoria = "Femenil"
  let link = servidor + title + "/" + categoria + "/" ;
  title = title + categoria

  let option = ["Resultados",  "Goleo y Asistencia" ,"Planteles" , "Sancionados"]

  let Menu = [
    { option: option[0] , link:link + option[0]},
    { option: option[1] , link:link + option[1]},
    { option: option[2] , link:link + option[2]},
    { option: option[3] , link:link + option[3]},

];
res.render('home', { StyleSheet , title , titulo_card:title , Menu});
});

router.get('/Resultados', function(req, res, next) {
  let StyleSheet = "Resultados.less"
  let title = "Ed"
  let Categoria = "Femenil"
  let Seccion = "Resultados"


res.render('Resultados',{StyleSheet , Liga:title , title, Categoria, Seccion});
});

router.post('/Resultados', function(req, res, next) {
  let {Equipo} = req.body
  let {GF} = req.body
  let result = [Equipo[0],GF[0]]
  console.log(result)
res.render('post');
});


module.exports = router;