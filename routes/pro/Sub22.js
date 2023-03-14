var express = require('express');
var router = express.Router();
const pool = require('../../database');


let servidor = "http://localhost:8082/";
let title = "Pro"
const Liga = 'Liga ProChampions'
let categoria = "Sub22"
const css = 'general_pro'
const StyleSheet = "index.less"
let logo_liga = "logochampions.png"
let fondo = 'url("/images/fondochampions.jpg")';
let color = 'rgb(255, 195, 0)'
let jornada = "Jornada"
let StyleSheet_Resultados = "Resultados.less"
//Menu Inferior
let Menu_jugadores = "Jugadores"
let Torneo_Abreviado = "C2022"
let Menu_Sancionados = "Sancionados"

/* GET users listing. */
router.get('/', function(req, res, next) {
  let link = servidor + title + "/" + categoria + "/" ;
  let title_categoria = title + categoria

  let option = ["Resultados",  "Goleo y Asistencia" ,"Planteles" , "Sancionados" , "Vistas"]

  let Menu = [
    { option: option[0] , link:link + option[0]},
    { option: option[1] , link:link + option[1]},
    { option: option[2] , link:link + option[2]},
    { option: option[3] , link:link + option[3]},
    { option: option[4] , link:link + option[4]},

];
res.render('home', { StyleSheet , title:title_categoria , titulo_card:title_categoria , Menu , Menu_jugadores, Torneo_Abreviado, Menu_Sancionados});
});


router.get('/General', async(req, res, next)=> {
  const vistas = await pool.query("SELECT * FROM `pro_general_sub23_a23`");

    const result = await pool.query("SELECT * FROM `pro_jor_sub22_a2023`");



//Inicializamos variables
    vistas_ganados = []
    vistas_Perdidos = []
    vistas_ganadospenales = []
    vistas_Perdidospenales = []

  //Aislamos los ids de equipos
const Equipos = vistas.map((item) =>{
  return item.ID
})
 console.log(Equipos)

Equipos.forEach(index => {
  
  console.log("Index de la tabla general")
  console.log(vistas[0])


  console.log(index)
 //Filtramo el equipo  

 const filteritems = result.filter((item)=>{
  return item.Equipo == index
})

 //Filtramos

 const filterpg = filteritems.filter((item)=>{
  return item.Puntos == 3
})

const filterppp = filteritems.filter((item)=>{
  return item.Puntos == 1
})

const filterpgp = filteritems.filter((item)=>{
  return item.Puntos == 2
})
const filterpp = filteritems.filter((item)=>{
  return item.Puntos == 0
})

//contamos   

pg = filterpg.length
pgp = filterpgp.length
ppp = filterppp.length
pp = filterpp.length

//Creamos un array para ganados perdimos etc

vistas_ganados.splice(0 , 0 , pg); 
vistas_Perdidos.splice(0 , 0 , pp); 
vistas_Perdidospenales.splice(0 , 0 , ppp); 
vistas_ganadospenales.splice(0 , 0 , pgp); 



});

vistas_ganados = vistas_ganados.reverse()
vistas_Perdidos = vistas_Perdidos.reverse()
vistas_Perdidospenales = vistas_Perdidospenales.reverse()
vistas_ganadospenales = vistas_ganadospenales.reverse()


    

  
    
    res.render('general',{vistas,categoria,result,vistas_ganados,vistas_Perdidos,vistas_Perdidospenales,vistas_ganadospenales,css,Liga})
});



router.get('/Resultados', async(req, res, next) =>{

  let Seccion = "Resultados"
  const Planteles = await pool.query("SELECT * FROM `pro_general_sub23_a23`");
  const Jornadas = await pool.query("SELECT Jornada FROM `pro_jor_sub22_a2023` GROUP BY Jornada");

res.render('Resultados',{StyleSheet:StyleSheet_Resultados , Liga:title , title, categoria, Seccion , Planteles,Jornadas});
});

router.post('/Resultados', async(req, res, next)=> {
  let {Equipo,Equipo_2,GF,GC,Jornada,Fecha,Puntos,Puntos_rv} = req.body;
  let Resultados = []
  
  for (let i = 0; i < 5; i++) {
    if(GF[i] == ""){
      //crear el como salir del bucle cuando este vacio
    } else{
      Resultados[i] = [
        {Jornada,Equipo:Equipo[i],GF:GF[i],GC:GC[i],Puntos:Puntos[i], Rival:Equipo_2[i],Fecha},
        {Jornada,Equipo:Equipo_2[i],GF:GC[i],GC:GF[i],Puntos:Puntos_rv[i],Rival:Equipo[i],Fecha}
      ]

      await pool.query("INSERT INTO pro_sub22_a23 set ?",[Resultados[i][0]])
      await pool.query("INSERT INTO pro_sub22_a23 set ?",[Resultados[i][1]])


    }  
  }
  res.redirect("http://localhost:8082/Pro/Sub22/Resultados/Imagenes");
});

router.get('/Resultados/Imagenes', async (req, res, next) => {
  const resul = await pool.query("SELECT * FROM `pro_jor_sub22_a2023` ORDER BY ID DESC LIMIT 30;");
 

  res.render('Resultados-img', {resul,categoria,Liga,logo_liga,fondo,color,jornada});
});



router.get('/Resultados/Delete/:id', async (req, res, next) => { 
  let regis_delete = req.params.id;

  await pool.query("DELETE FROM `futbolce_zon58`.`pro_sub22_a23` WHERE  `ID`= ?;",[regis_delete])
  

  

  res.redirect("http://localhost:8082/Pro/Sub22/Resultados/Imagenes");


});

router.get('/Vistas', function(req, res, next) {
  
  let link = servidor + title + "/" + categoria + "/" ;
  let title_categoria = title + categoria
  let option = ["Resultados/Imagenes",  "Goleo y Asistencia" ,"Planteles/Imagenes" , "Sancionados" , "General"]

  let Menu = [
    { option: option[0] , link:link + option[0]},
    { option: option[1] , link:link + option[1]},
    { option: option[2] , link:link + option[2]},
    { option: option[3] , link:link + option[3]},
    { option: option[4] , link:link + option[4]},

];
res.render('home', { StyleSheet , title:title_categoria , titulo_card:title , Menu, Menu_jugadores});
});


router.get('/Planteles', function(req, res, next) {
  
res.render('Planteles');
});

router.get('/Planteles/Imagenes', function(req, res, next) {
  
  res.render('Planteles-img');
  });



module.exports = router;

