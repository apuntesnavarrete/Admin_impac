
var express = require('express');
var router = express.Router();
const pool = require('../../database');


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

router.get('/Resultados', async(req, res, next) =>{
  let StyleSheet = "Resultados.less"
  let title = "Ed"
  let Categoria = "Femenil"
  let Seccion = "Resultados"
  const Planteles = await pool.query("SELECT * FROM `ed_general_fem_c22`");
  const Jornadas = await pool.query("SELECT Jornada FROM `ed_jor_fem_c22` GROUP BY Jornada");

  console.log(Planteles)
  console.log(Jornadas)


res.render('Resultados',{StyleSheet , Liga:title , title, Categoria, Seccion , Planteles,Jornadas});
});

router.post('/Resultados', async(req, res, next)=> {
  let {Equipo,Equipo_2,GF,GC,Jornada,Fecha,Puntos,Puntos_rv} = req.body;
  let Resultados = []
  
  for (let i = 0; i < 5; i++) {
    if(Equipo[i] == ""){
      //crear el como salir del bucle cuando este vacio
    } else{
      Resultados[i] = [
        {Jornada,Equipo:Equipo[i],GF:GF[i],GC:GC[i],Puntos:Puntos[i], Rival:Equipo_2[i],Fecha},
        {Jornada,Equipo:Equipo_2[i],GF:GC[i],GC:GF[i],Puntos:Puntos_rv[i],Rival:Equipo[i],Fecha}
      ]
    }  
  }
console.log(Resultados)



  res.render('post');
});


module.exports = router;