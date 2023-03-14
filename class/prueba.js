const { Router } = require('express');
var express = require('express');
var router = express.Router();
const pool = require('../database');


class MyClass {
    constructor(servidor,title,liga, categoria ,color , jornada,Torneo_Abreviado) {
        this.servidor = servidor;
        this.title = title;
        this.liga = "Liga" + liga;
        this.categoria = categoria
        this.css = "general_" + title
        this.StyleSheet = "index.less"
        this.logo_liga = "logo" + title
        this.fondo = 'url("/images/fondo' + title + '.jpg")'
        this.color = color
        this.jornada = jornada
        this.StyleSheet_Resultados = "Resultados.less"
        this.Torneo_Abreviado = Torneo_Abreviado
//Menu Inferior
        this.Menu_jugadores = "Jugadores"
        this.Menu_Equipos = "Equipos"
        this.Menu_Sancionados = "Sancionados"

        this.title_categoria = this.title + this.categoria

        this.option = ["Resultados",  "Goleo y Asistencia" ,"Planteles" , "Sancionados" , "Vistas"]
        this.option_vistas = ["Resultados/Imagenes",  "Goleo y Asistencia" ,"Planteles/Imagenes" , "Sancionados" , "General"]

        this.link = this.servidor + this.title + "/" + this.categoria + "/" ;

        this.consulta_vista_general = "SELECT * FROM `" + this.title + "_general_libre_a23`";
        this.consulta_vista_jornadas = "SELECT * FROM `" + this.title + "_jor_libre_a2023`";
        this.consulta_vista_jornadas_conteo = "SELECT Jornada FROM `" + this.title + "_jor_libre_a2023` GROUP BY Jornada";
        this.consulta_insert_resultado = "INSERT INTO " + this.title  + "_libre_a23 set ?"
        this.consulta_jornadas_img = "SELECT * FROM `" + this.title + "_jor_libre_a2023` ORDER BY ID DESC LIMIT 30";
        this.consulta_jornadas_delete_id = "DELETE FROM `" + this.title + "_libre_a23` WHERE `ID`= ?;";
        
       
        this.redirec_resultados = this.servidor + this.title + "/"+ this.categoria + "/Resultados/Imagenes"
        
    }
 
    principal(req, res) {


        let Menu = [];
        for (let i = 0; i < this.option.length; i++) {
          Menu.push({ option: this.option[i], link: this.link + this.option[i] });
        }

        console.log(Menu)

        res.render('home', { StyleSheet:this.StyleSheet , title:this.title_categoria , titulo_card:this.title_categoria , Menu , Menu_jugadores:this.Menu_jugadores, Menu_Equipos:this.Menu_Equipos, Menu_Sancionados:this.Menu_Sancionados});
    }

    async Resultados(req, res) {
        console.log(this.consulta_vista_general)

        let Seccion = "Resultados"
        const vistas = await pool.query(this.consulta_vista_general);
        const Jornadas = await pool.query(this.consulta_vista_jornadas_conteo);
      
        console.log(this.consulta_vista_general)
        console.log(Jornadas)

      res.render('Resultados',{StyleSheet:this.StyleSheet_Resultados , Liga:this.title , title:this.title, categoria:this.categoria, Seccion , Planteles:vistas,Jornadas});
          }


          async Resultados_post(req, res, next) {

            let {Equipo,Equipo_2,GF,GC,Jornada,Fecha,Puntos,Puntos_rv} = req.body;
            console.log(req.body)
             let Resultados = []
             
             for (let i = 0; i < 5; i++) {
               if(GF[i] == ""){
                 //crear el como salir del bucle cuando este vacio
               } else{
                 Resultados[i] = [
                   {Jornada,Equipo:Equipo[i],GF:GF[i],GC:GC[i],Puntos:Puntos[i], Rival:Equipo_2[i],Fecha},
                   {Jornada,Equipo:Equipo_2[i],GF:GC[i],GC:GF[i],Puntos:Puntos_rv[i],Rival:Equipo[i],Fecha}
                 ]
           
                 await pool.query(this.consulta_insert_resultado,[Resultados[i][0]])
                 await pool.query(this.consulta_insert_resultado,[Resultados[i][1]])
           
           
               }  
             }
             res.redirect(this.redirec_resultados);
           };

           async Resultados_vista(req, res, next) {

            const resul = await pool.query(this.consulta_jornadas_img);
            console.log(resul)
            res.render('Resultados-img', {resul,categoria:this.categoria,Liga:this.liga,logo_liga:this.logo_liga,fondo:this.fondo,color:this.color,jornada:this.jornada});
              }

              async Resultados_delete_id(req,res,next){
                let regis_delete = req.params.id;
                await pool.query(this.consulta_jornadas_delete_id,[regis_delete])
                res.redirect(this.redirec_resultados);

              }

          async general(req, res, next) {
  

            const vistas = await pool.query(this.consulta_vista_general);
            const result = await pool.query(this.consulta_vista_jornadas);
            console.log(vistas)

          //Inicializamos variables
           let vistas_ganados = []
            let vistas_Perdidos = []
             let vistas_ganadospenales = []
            let vistas_Perdidospenales = []
          
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
          
         let pg = filterpg.length
         let pgp = filterpgp.length
        let ppp = filterppp.length
         let pp = filterpp.length
          
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
          
          res.render('general',{vistas,categoria:this.categoria,result,vistas_ganados,vistas_Perdidos,vistas_Perdidospenales,vistas_ganadospenales,css:this.css,Liga:this.liga})
            }
          

            Menu_secundario(req, res) {


                let Menu = [];
                for (let i = 0; i < this.option_vistas.length; i++) {
                  Menu.push({ option: this.option_vistas[i], link: this.link + this.option_vistas[i] });
                }
        
                console.log(Menu)
        
                res.render('home', { StyleSheet:this.StyleSheet , title:this.title_categoria , titulo_card:this.title_categoria , Menu , Menu_jugadores:this.Menu_jugadores, Menu_Equipos:this.Menu_Equipos, Menu_Sancionados:this.Menu_Sancionados});
            }


  }
  
  module.exports = MyClass;