const pool = require('../database');



const MyClass = require("../class/prueba");
const myClassInstance = new MyClass("http://localhost:8082/" , 
"Pro" , "ProChampions" , "Libre" ,'rgb(230 161 197)', "Jornada", "C2022");

/*
let servidor = "http://localhost:8082/";
let title = "Pro"
const Liga = 'Liga ProChampions'
let categoria = "Libre"
const css = 'general_pro'
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
*/
/*
function principal(req, res) {

  let Menu = [];
  for (let i = 0; i < myClassInstance.option.length; i++) {
    Menu.push({ option: myClassInstance.option[i], link: myClassInstance.link + myClassInstance.option[i] });
  }



res.render('home', { StyleSheet:myClassInstance.StyleSheet , title:myClassInstance.title_categoria , titulo_card:myClassInstance.title_categoria , Menu , Menu_jugadores:myClassInstance.Menu_jugadores, Menu_Equipos:myClassInstance.Menu_Equipos, Menu_Sancionados:myClassInstance.Menu_Sancionados});
}
*/
async function general(req, res, next) {
  

  const vistas = await pool.query(myClassInstance.consulta_vista_general);
  const result = await pool.query(myClassInstance.consulta_vista_jornadas);

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

res.render('general',{vistas,categoria:myClassInstance.categoria,result,vistas_ganados,vistas_Perdidos,vistas_Perdidospenales,vistas_ganadospenales,css:myClassInstance.css,Liga:myClassInstance.liga})
  }

async function Resultados(req, res, next) {

  let Seccion = "Resultados"
  const vistas = await pool.query(myClassInstance.consulta_vista_general);
  const Jornadas = await pool.query(myClassInstance.consulta_vista_jornadas_conteo);

res.render('Resultados',{StyleSheet:myClassInstance.StyleSheet_Resultados , Liga:myClassInstance.title , title:myClassInstance.title, categoria:myClassInstance.categoria, Seccion , Planteles:vistas,Jornadas});
    }

    async function Resultados_post(req, res, next) {

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
    
          await pool.query(myClassInstance.consulta_insert_resultado,[Resultados[i][0]])
          await pool.query(myClassInstance.consulta_insert_resultado,[Resultados[i][1]])
    
    
        }  
      }
      res.redirect(myClassInstance.redirec_resultados);
    };

    async function Resultados_vista(req, res, next) {

      const resul = await pool.query(myClassInstance.consulta_jornadas_img);
      res.render('Resultados-img', {resul,categoria:myClassInstance.categoria,Liga:myClassInstance.liga,logo_liga:myClassInstance.logo_liga,fondo:myClassInstance.fondo,color:myClassInstance.color,jornada:myClassInstance.jornada});
        }

  module.exports = {
     
    general,
    Resultados,
    Resultados_post,
    Resultados_vista
  };