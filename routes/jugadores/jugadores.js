var express = require('express');
var router = express.Router();
const pool = require('../../database');

/*
router.get('/', async(req, res, next)=> {
    let title = "Jugadores"
    let StyleSheet = "Resultados.less"
  
    const tabla_jugadores = await pool.query("SELECT `ID_FB`, `Nombres` FROM `registro global heroes` ORDER BY ID_FB DESC ");
   
    
    let Id_nuevo = tabla_jugadores[0]["ID_FB"] + 1
  
  res.render('Jugadores', {title, StyleSheet , Id_nuevo , tabla_jugadores});
  });
  
  router.post('/', async(req, res, next)=> {
    let {Id, Nombre , Curp} = req.body;
    console.log(Id)
    console.log(Nombre)
    console.log(Curp)
  
    let Foto = `/jug/${Id}.jpg` 
    console.log(Foto)
  
  let Jugador = {ID_FB:Id, Nombres:Nombre , Curp ,Foto }
  
  console.log(Jugador)
    await pool.query("INSERT INTO `registro global heroes` set ?",[Jugador])
  
  
  res.redirect('http://localhost:8082/');
  });
  */
  router.get('/', async(req, res, next)=> {
    
    const tabla_jugadores = await pool.query("SELECT `ID_FB`, `Nombres` FROM `registro global heroes` ORDER BY ID_FB DESC ");
   
    
    let Id_nuevo = tabla_jugadores[0]["ID_FB"] + 1
  
  res.render('Jugadores-vista', {Id_nuevo});
  });
  
  router.post('/', async(req, res, next)=> {
    
    let {Id, Nombre , Curp} = req.body;
    console.log(Id)
    console.log(Nombre)
    console.log(Curp)
  
    let Foto = `/jug/${Id}.jpg` 
    console.log(Foto)
  
  let Jugador = {ID_FB:Id, Nombres:Nombre , Curp ,Foto }
  
  console.log(Jugador)
  await pool.query("INSERT INTO `registro global heroes` set ?",[Jugador])

  
  res.redirect('http://localhost:8082/Jugadores');
  });


  router.get('/Json', async(req, res, next)=> {
    
    const tabla_jugadores = await pool.query("SELECT `ID_FB`, `Nombres`, `Foto` FROM `registro global heroes` ORDER BY ID_FB DESC ");
  
  res.json(tabla_jugadores);
  });

  module.exports = router;
