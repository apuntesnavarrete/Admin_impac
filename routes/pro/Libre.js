const { Router } = require('express');
var express = require('express');
var router = express.Router();
const pool = require('../../database');


const MyClass = require("../../class/prueba");
const myClassInstance = new MyClass("http://localhost:8082/" , 
"Pro" , "ProChampions" , "Libre", "Jornada", "A23");

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

router.get('/Resultados/Imagenes',function(req,res,next){
  myClassInstance.Resultados_vista(req,res)
 
});


router.get('/Resultados/Delete/:id',function(req,res,next){
  myClassInstance.Resultados_delete_id(req,res)
});


router.get('/Vistas',function(req,res,next){
  myClassInstance.Menu_secundario(req,res)
});

///Seccion planteles

router.get('/Planteles',function(req,res,next){
  myClassInstance.Planteles(req,res)
});

router.post('/Planteles',function(req,res,next){
  myClassInstance.Planteles_Post(req,res)
});

router.get('/Planteles/Imagenes',function(req,res,next){
  myClassInstance.Planteles_imagenes(req,res)
});

router.get('/Planteles/Imagenes/:plantel',function(req,res,next){
  myClassInstance.consulta_planteles_img_id(req,res)
});

router.get('/Planteles/Imagenes/Json/:plantel',function(req,res,next){
  myClassInstance.planteles_imagenes_equipo_json(req,res)
});

module.exports = router;
