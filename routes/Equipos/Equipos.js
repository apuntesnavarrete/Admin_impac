var express = require('express');
var router = express.Router();
const pool = require('../../database');

router.get('/', async(req, res, next)=> {
    
    const tabla_equipos = await pool.query("SELECT `id_plantel` FROM `registros global equipo heroes` ORDER BY id_plantel DESC ");
   
    
    let Id_nuevo = tabla_equipos[0]["id_plantel"] + 1
  
  res.render('Equipos', {Id_nuevo});
  });


  router.post('/', async(req, res, next)=> {
      
    let {Id, Nombre , Curp} = req.body;
    console.log(Id)
    console.log(Nombre)
    console.log(Curp)
  
    let Foto = `/img/${Id}.png` 
    console.log(Foto)
  
  let Jugador = {ID_FB:Id, Nombres:Nombre ,Foto }
  
  console.log(Jugador)
  await pool.query("INSERT INTO `registros global equipo heroes` set ?",[Jugador])

  
  res.redirect('http://localhost:8082/Equipos');

    res.render('Equipos');
    });
    

    router.get('/Json', async(req, res, next)=> {
    
        const tabla_Equipos = await pool.query("SELECT `id_plantel`, `Nombre_Equipo`, `Escudo` FROM `registros global equipo heroes` ORDER BY id_plantel DESC ");
      
      res.json(tabla_Equipos);
      });
    

  module.exports = router;