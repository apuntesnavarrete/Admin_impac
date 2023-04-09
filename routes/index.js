var express = require("express");
var router = express.Router();
const pool = require("../database");
const ligas = require("../conf/ligas");
const MyClass = require("../class/prueba");

const servidor = ligas["Servidor"]


router.get("/", function (req, res, next) {
  // Creamos un array de opciones vacío
  let Menu = [];
  // Iteramos sobre las propiedades del objeto "ligas"
  for (let liga in ligas["Ligas"]) {
    // Agregamos una nueva opción al array de opciones
    Menu.push({
      option: liga,
      link: `${servidor}${liga}`,
    });
  }

  let title = "Principal";
  let titulo_card = "Impacto";

  res.render("home", {
    StyleSheet:ligas["StyleSheet"],
    title,
    titulo_card,
    Menu,
    Menu_jugadores:ligas["Menu_jugadores"],
    Menu_Equipos:ligas["Menu_Equipos"],
    Menu_Sancionados:ligas["Menu_Sancionados"],
  });
});

/* Principal */

router.get("/:liga", function (req, res, next) {
  const n = Object.keys(ligas["Ligas"]).length;
  for (let i = 0; i < n; i++) {
    if (req.params.liga == Object.keys(ligas["Ligas"])[i]) {
      // codigo a modificar
      let title = Object.keys(ligas["Ligas"])[i];
      let link = `${servidor}${title}/`;
      let categorias = ligas["Ligas"][title]["categorias"];

      let Menu = categorias.map((categoria) => {
        return {
          option: categoria.name,
          link: link + categoria.name,
        };
      });

      res.render("home", {
        StyleSheet:ligas["StyleSheet"],
        title,
        titulo_card: title,
        Menu,
        Menu_jugadores:ligas["Menu_jugadores"],
        Menu_Equipos:ligas["Menu_Equipos"],
        Menu_Sancionados:ligas["Menu_Sancionados"],
      });
      // codigo a modificar
      return;
    }
  }
  res.status(404).send("No se encontró la liga especificada");
});

router.get("/:liga/:categoria", function (req, res, next) {
  const n = Object.keys(ligas["Ligas"]).length;

  for (let i = 0; i < n; i++) {
    if (req.params.liga == Object.keys(ligas["Ligas"])[i]) {
      // codigo a modificar
      let title = Object.keys(ligas["Ligas"])[i];
      const link = `${servidor}${title}/`;
      let categorias = ligas["Ligas"][title]["categorias"];

      /*data need for mi class*/
      let liga = req.params.liga;
      let categoria = req.params.categoria;
      const Torneo_Abreviado = "A22";
      const jornada = "Jornada";
      /*data need for mi class*/

      const ligaCategoria = new MyClass(
        servidor,
        title,
        liga,
        categoria,
        jornada,
        Torneo_Abreviado
      );

      ligaCategoria.principal(req, res);
      return;
    }
  }
  res.status(404).send("No se encontró la Categoria especificada");
});

router.get("/:liga/:categoria/Resultados", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );

  ligaResultado.Resultados(req, res);
});

router.post("/:liga/:categoria/Resultados", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );

  ligaResultado.Resultados_post(req, res);
});

router.get("/:liga/:categoria/Resultados/Delete/:id", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );

  ligaResultado.Resultados_delete_id(req, res);
});


router.get("/:liga/:categoria/Planteles", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );

  console.log(ligaResultado)

  ligaResultado.Planteles(req, res);
});


router.post("/:liga/:categoria/Planteles", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );

  console.log(ligaResultado)

  ligaResultado.Planteles_Post(req, res);
});

router.post("/:liga/:categoria/Planteles/Json", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]
/*
  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );
*/
  console.log(ligaResultado)

//  ligaResultado.planteles_imagenes_equipo_json(req, res);
});



router.get("/:liga/:categoria/Vistas", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );

  console.log(ligaResultado)

  ligaResultado.Menu_secundario(req, res);
});

router.get("/:liga/:categoria/General", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );

  console.log(ligaResultado)

  ligaResultado.general(req, res);
});

router.get("/:liga/:categoria/Resultados/Imagenes", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );

  console.log(ligaResultado)

  ligaResultado.Resultados_vista(req, res);
});

router.get("/:liga/:categoria/Planteles/Imagenes", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );

  console.log(ligaResultado)

  ligaResultado.Planteles_imagenes(req, res);
});

router.get("/:liga/:categoria/Planteles/Edit/:jugador", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let jugador = req.params.jugador;

  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

 
  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );


  

 ligaResultado.planteles_edit_jugador_id(req, res);

});

router.post("/:liga/:categoria/Planteles/Edit/:jugador", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let jugador = req.params.jugador;

  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

 
  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );


  
 ligaResultado.planteles_edit_jugador_id_post(req, res);

});

router.get("/:liga/:categoria/Planteles/Imagenes/:plantel", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );

  console.log(ligaResultado)

  ligaResultado.planteles_imagenes_equipo(req, res);
});

router.get("/:liga/:categoria/Planteles/Imagenes/Json/:plantel", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );

  console.log(ligaResultado)

  ligaResultado.planteles_imagenes_equipo_json(req, res);
});

router.get("/:liga/:categoria/Planteles/Json/", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = req.params.liga;;
  const jornada = ligas["Ligas"][title]["jornada"];
  /*data need for mi class*/

 let Torneo_Abreviado = ligas["Ligas"][title]["categorias"].find(categoria => categoria.name == req.params.categoria).torneos[0]

  const ligaResultado = new MyClass(
    servidor,
    title,
    liga,
    categoria,
    jornada,
    Torneo_Abreviado
  );

  console.log(ligaResultado)

  ligaResultado.planteles_imagenes_equipo_json(req, res);
});

module.exports = router;
