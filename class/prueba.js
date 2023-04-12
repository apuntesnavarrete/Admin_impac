const { Router } = require('express');
var express = require('express');
var router = express.Router();
const pool = require('../database');


class MyClass {
    constructor( servidor,title,liga, categoria , jornada,Torneo_Abreviado ) {
      
      
      
      
        this.servidor = servidor;
        this.title = title;
        this.liga = "Liga " + liga;
        this.categoria = categoria
        this.css = "general_" + title
        this.StyleSheet = "index.less"
        this.logo_liga = "logo" + title
        this.fondo = 'url("/images/fondo' + title + '.jpg")'
        
        switch (this.categoria) {
          case "Libre":
            this.color = "rgb(48 232 145)"
            break;
        
          case "Femenil":
            this.color = 'rgb(230 161 197)'
            break;
        
          case "Mixta":
              this.color = 'rgb(177, 139, 202)'
              break;

          case "Sub21":
              this.color = 'rgb(255, 128, 0)'
              break;

          case "Sub22":
                this.color = 'rgb(255, 128, 0)'
                break;

                case "Sub23":
                  this.color = 'rgb(255, 128, 0)'
                  break;

                case "Sub18":
                  this.color = 'rgb(255 150 95)'
                  break;
          // Se pueden incluir todos los casos que quieras
        
          default:
            this.color = "black"

        }

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

        this.consulta_vista_general = "SELECT * FROM `" + this.title + "_general_" + this.categoria + "_" + this.Torneo_Abreviado + "`";
        this.consulta_vista_jornadas = "SELECT * FROM `" + this.title + "_jor_" + this.categoria + "_" + this.Torneo_Abreviado + "`";
        this.consulta_vista_jornadas_conteo = "SELECT Jornada FROM `" + this.title + "_jor_" + this.categoria + "_" + this.Torneo_Abreviado + "` GROUP BY Jornada";
        this.consulta_insert_resultado = "INSERT INTO " + this.title  + "_" + this.categoria + "_" + this.Torneo_Abreviado + " set ?"
     
        this.consulta_jornadas_partido = "SELECT * FROM `" + this.title + "_jor_" + this.categoria + "_" + this.Torneo_Abreviado + "` Where `ID`=?";

        this.consulta_jornadas_img = "SELECT * FROM `" + this.title + "_jor_" + this.categoria + "_" + this.Torneo_Abreviado + "` ORDER BY ID DESC LIMIT 30";
        this.consulta_jornadas_delete_id = "DELETE FROM `" + this.title + "_" + this.categoria + "_" + this.Torneo_Abreviado + "` WHERE `ID`= ?;";
        this.consulta_planteles_delete_id = "DELETE FROM `" + this.title + "_planteles_" + this.categoria + "_" + this.Torneo_Abreviado + "` WHERE `ID`= ?;";

        this.consulta_planteles_vistas = "SELECT * FROM `" + this.title + "_planteles_" + this.categoria + "_" + this.Torneo_Abreviado + "`"
        this.consulta_planteles_insert_id = "INSERT INTO `" + this.title + "_planteles_" + this.categoria + "_" + this.Torneo_Abreviado + "` set ?"
        this.consulta_planteles_img = "SELECT * FROM `" + this.title + "_planteles_" + this.categoria + "_" + this.Torneo_Abreviado + "_v` ORDER BY `Equipo` DESC"
        this.consulta_planteles_img_id = "SELECT * FROM `" + this.title + "_planteles_" + this.categoria + "_" + this.Torneo_Abreviado + "_v` WHERE `Nombre_Equipo`=? ORDER BY `ID` ASC"
        this.consulta_planteles_jugador_id = "SELECT * FROM `" + this.title + "_planteles_" + this.categoria + "_" + this.Torneo_Abreviado + "_v` WHERE `ID`=? ORDER BY `ID` ASC"
        this.consulta_planteles_jugador_id_edit = "UPDATE `" + this.title + "_planteles_" + this.categoria + "_" + this.Torneo_Abreviado + "` SET `Dorsal`=? ,`Torneo`=?  WHERE  `ID_INGRESO`=?;"


        this.redirec_resultados = this.servidor + this.title + "/"+ this.categoria + "/Resultados/Imagenes"
        this.redirec_planteles = this.servidor + this.title + "/"+ this.categoria + "/Planteles/Imagenes"

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
      console.log(this.consulta_vista_jornadas_conteo)

        let Seccion = "Resultados"
        const vistas = await pool.query(this.consulta_vista_general);
        const Jornadas = await pool.query(this.consulta_vista_jornadas_conteo);
      
        

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

              async partidos_i(req, res, next) {
                let partido = req.params.partido;

                  console.log(this.consulta_jornadas_partido)
               const resul = await pool.query(this.consulta_jornadas_partido,[partido]);
              const equipo_local = resul[0].Nombre_Equipo
              const equipo_Visitante = resul[0].Equipolc

 
              const plantel_equipo_local = await pool.query(this.consulta_planteles_img_id,[equipo_local]);
              const plantel_equipo_Visitante = await pool.query(this.consulta_planteles_img_id,[equipo_Visitante]);


              console.log(plantel_equipo_Visitante)
              res.render('goles_i',{StyleSheet:this.StyleSheet_Resultados , Liga:this.title , title:this.title, categoria:this.categoria, plantel_equipo_Visitante,plantel_equipo_local, partido});
          }

            async partidos_post(req, res, next) {
              let {Id , numero , goles , asistencia , Id_v , numero_v , goles_v, asistencia_v , equipolocal , equipovisitante} = req.body;

              let jugadores = [];
              for (let i = 0; i < Id.length; i++) {
                jugadores.push([equipolocal, Id[i], numero[i], goles[i], asistencia[i]]);
                jugadores.push([equipovisitante, Id_v[i], numero_v[i], goles_v[i], asistencia_v[i]]);

              }

         //   console.log(partido)
            res.send(jugadores[0]);
          }



              async Resultados_delete_id(req,res,next){
                let regis_delete = req.params.id;
                await pool.query(this.consulta_jornadas_delete_id,[regis_delete])
                res.redirect(this.redirec_resultados);

              }

          async general(req, res, next) {
  
            console.log(this.consulta_vista_general)
            console.log(this.consulta_vista_jornadas)

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

            async Planteles(req,res){

              const Planteles = await pool.query(this.consulta_vista_general);

              res.render('Planteles' ,{Liga:this.title , categoria:this.categoria,title:this.title,StyleSheet:this.StyleSheet,Planteles,Torneo_Abreviado:this.Torneo_Abreviado});

            }

            async Planteles_Post(req,res){
              let {Equipo , Torneo , ID , Dorsal} = req.body;

              console.log(Equipo)
              console.log(ID)
              const Planteles = await pool.query(this.consulta_planteles_vistas);
              let Resultados = []
            
              for (let i = 0; i < 5; i++) {
                if(ID[i] == ""){
                  //crear el como salir del bucle cuando este vacio
                } else{
                  Resultados[i] = [
                    {Equipo,Torneo, ID:ID[i],Dorsal:Dorsal[i],ID_INGRESO:ID[i] }
                  ]
            
                  console.log(Resultados[i])
                  await pool.query(this.consulta_planteles_insert_id,[Resultados[i][0]])
                 
            
            
                }  
              }
            
            
            res.render('Planteles' ,{Liga:this.title , categoria:this.categoria ,title:this.title,StyleSheet:this.StyleSheet,Planteles,Torneo_Abreviado:this.Torneo_Abreviado});
            }

            async Planteles_imagenes(req,res){
              const plantel = await pool.query(this.consulta_planteles_img);
  
             res.render('planteles-img',{plantel ,Liga:this.liga , categoria:this.categoria});
            }

            async Planteles_delete_id(req,res,next){
              let regis_delete = req.params.id;
              console.log(regis_delete)
              await pool.query(this.consulta_planteles_delete_id,[regis_delete])
              res.redirect(this.redirec_planteles);

            }

            async planteles_imagenes_equipo(req,res){
              let equipo = req.params.plantel

              console.log(equipo)
             const plantel = await pool.query(this.consulta_planteles_img_id , [equipo]);
             console.log(plantel)

              res.render('planteles-hoja',{plantel ,Liga:this.liga , categoria:this.categoria});
            }

            async planteles_imagenes_equipo_json(req,res){
              
             const plantel = await pool.query(this.consulta_planteles_img);
             console.log(plantel)
             res.json(plantel);
            }

            async planteles_edit_jugador_id(req,res){
              let jugador = req.params.jugador;
              console.log(jugador)
              const plantel = await pool.query(this.consulta_planteles_jugador_id , [jugador]);
              console.log(plantel)
             res.render('planteles_edit_jugador',{plantel,Liga:this.title , categoria:this.categoria});
            }

            async planteles_edit_jugador_id_post(req,res){
              let {ID,Dorsal,Torneo} = req.body;
              console.log(ID)
              console.log(Dorsal)
              console.log(Torneo)

             await pool.query(this.consulta_planteles_jugador_id_edit,[Dorsal,Torneo,ID])
             res.send("aqui adata")
            }
  }
  
  module.exports = MyClass;