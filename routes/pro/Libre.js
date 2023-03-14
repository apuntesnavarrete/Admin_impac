const { Router } = require('express');
var express = require('express');
var router = express.Router();
const pool = require('../../database');

const MyClass = require("../../class/prueba");
const myClassInstance = new MyClass("http://localhost:8082/" , 
"Pro" , "ProChampions" , "Libre" ,'rgb(230 161 197)', "Jornada", "C2022");

const { general , Resultados, Resultados_post ,Resultados_vista} = require('../../controllers/home');


let servidor = "http://localhost:8082/";
let title = "Pro"
const Liga = 'Liga ProChampions'
let categoria = "Libre"
const css = 'general_pro'
const StyleSheet = "index.less"
let logo_liga = "logochampions.png"
let fondo = 'url("/images/fondochampions.jpg")';
let color = 'rgb(230 161 197)'
let jornada = "Jornada"
let StyleSheet_Resultados = "Resultados.less"
let Torneo_Abreviado = "C2022"
//Menu Inferior



let Menu_jugadores = "Jugadores"
let Menu_Equipos = "Equipos"
let Menu_Sancionados = "Sancionados"




router.get('/',function(req,res,next){
  myClassInstance.principal(req,res)
});

router.get('/general',function(req,res,next){
  myClassInstance.general(req,res)
});

router.get('/Resultados',function(req,res,next){
  myClassInstance.Resultados(req,res)
});

router.post('/Resultados',function(req,res,next){
  myClassInstance.Resultados_post(req,res)
});
/*
router.get('/Resultados/Imagenes' , Resultados_vista);
*/
router.get('/Resultados/Imagenes',function(req,res,next){
  myClassInstance.Resultados_vista(req,res)
});


router.get('/Resultados/Delete/:id', async (req, res, next) => { 
  let regis_delete = req.params.id;

  await pool.query("DELETE FROM `futbolce_zon58`.`pro_libre_a23` WHERE  `ID`= ?;",[regis_delete])
  

  

  res.redirect("http://localhost:8082/ED/Libre/Resultados/Imagenes");


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
res.render('home', { StyleSheet , title:title_categoria , titulo_card:title , Menu, Menu_jugadores, Menu_Equipos, Menu_Sancionados});
});

///Seccion planteles


router.get('/Planteles', async(req, res, next)=> {
  const Planteles = await pool.query("SELECT * FROM `pro_general_libre_a22`");

res.render('Planteles' ,{Liga:title , categoria,title,StyleSheet,Planteles,Torneo_Abreviado});
});

router.post('/Planteles', async(req, res, next)=> {
  let {Equipo , Torneo , ID , Dorsal} = req.body;

  console.log(Equipo)
  console.log(ID)
  const Planteles = await pool.query("SELECT * FROM `pro_planteles_libre_a22`");
  let Resultados = []

  for (let i = 0; i < 5; i++) {
    if(ID[i] == ""){
      //crear el como salir del bucle cuando este vacio
    } else{
      Resultados[i] = [
        {Equipo,Torneo, ID:ID[i],Dorsal:Dorsal[i],ID_INGRESO:ID[i] }
      ]

      console.log(Resultados[i])
      await pool.query("INSERT INTO `pro_planteles_libre_a22` set ?",[Resultados[i][0]])
     


    }  
  }


res.render('Planteles' ,{Liga:title , categoria,title,StyleSheet,Planteles,Torneo_Abreviado});
});

  
router.get('/Planteles/Imagenes', async(req, res, next)=> {
  
    const plantel = await pool.query("SELECT * FROM `futbolce_zon58`.`pro_planteles_libre_a22_v` ORDER BY `Equipo` DESC");
  
    res.render('planteles-img',{plantel ,Liga , categoria});
      });


      router.get('/Planteles/Imagenes/:plantel', async(req, res, next)=> {
  
        let equipo = req.params.plantel

        console.log(equipo)
       const plantel = await pool.query("SELECT * FROM `futbolce_zon58`.`pro_planteles_libre_a22_v` WHERE `Nombre_Equipo`=? ORDER BY `ID` ASC" , [equipo]);
      
        res.render('planteles-hoja',{plantel ,Liga , categoria});
          });


module.exports = router;
