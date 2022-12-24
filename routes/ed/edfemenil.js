
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
  let {Equipo,Equipo_2,GF,GC,Jornada,Fecha} = req.body;

  console.log(Equipo)

  let Puntos = [0,1,2,3]
 



  let Resul_1 ={Jornada,Equipo:Equipo[0],GF:GF[0],GC:GC[0],Puntos:Puntos[0],Rival:Equipo_2[0],Fecha}
  let Resul_2 ={Jornada,Equipo:Equipo_2[0],GF:GC[0],GC:GF[0],Puntos:Puntos[0],Rival:Equipo[0],Fecha}

  let Resul_3 ={Jornada,Equipo:Equipo[1],GF:GF[1],GC:GC[1],Puntos:Puntos[1],Rival:Equipo_2[1],Fecha}
  let Resul_4 ={Jornada,Equipo:Equipo_2[1],GF:GC[1],GC:GF[1],Puntos:Puntos[1],Rival:Equipo[1],Fecha}

 console.log(Resul_1 , Resul_2 , Resul_3 , Resul_4)


  res.render('post');
});


module.exports = router;