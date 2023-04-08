var express = require("express");
var router = express.Router();
const pool = require("../database");
const ligas = require("../conf/ligas");
const MyClass = require("../class/prueba");

const servidor = ligas["Servidor"]

//let StyleSheet = "index.less";
let Menu_jugadores = "Jugadores";
let Menu_Equipos = "Equipos";
let Menu_Sancionados = "Sancionados";

router.get("/", function (req, res, next) {
  // Creamos un array de opciones vacío
  let opciones = [];

  // Iteramos sobre las propiedades del objeto "ligas"
  for (let liga in ligas["Ligas"]) {
    // Agregamos una nueva opción al array de opciones
    opciones.push({
      option: liga,
      link: `${servidor}${liga}`,
    });
  }
  // Creamos el objeto "Menu" utilizando el array de opciones
  let Menu = opciones;

  console.log(Menu);
  let title = "Principal";
  let titulo_card = "Impacto";

  res.render("home", {
    StyleSheet:ligas["StyleSheet"],
    title,
    titulo_card,
    Menu,
    Menu_jugadores,
    Menu_Equipos,
    Menu_Sancionados,
  });
});

/* Principal */

router.get("/:liga", function (req, res, next) {
  const n = Object.keys(ligas["Ligas"]).length;
  console.log(Object.keys(ligas["Ligas"]))
  for (let i = 0; i < n; i++) {
    if (req.params.liga == Object.keys(ligas["Ligas"])[i]) {
      // codigo a modificar
      let title = Object.keys(ligas["Ligas"])[i];
      let link = `${servidor}${title}/`;
      let categorias = ligas["Ligas"][title]["categorias"];
      console.log(categorias[0].name)


      let Menu = categorias.map((categoria) => {
        return {
          option: categoria.name,
          link: link + categoria.name,
        };
      });

      console.log(Menu)

      res.render("home", {
        StyleSheet:ligas["StyleSheet"],
        title,
        titulo_card: title,
        Menu,
        Menu_jugadores,
        Menu_Equipos,
        Menu_Sancionados,
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
  res.status(404).send("No se encontró la liga especificada");
});

router.get("/:liga/:categoria/Resultados", function (req, res, next) {

  /*data need for mi class*/
  let liga = req.params.liga;
  let categoria = req.params.categoria;
  let title = "Pro";
  const Torneo_Abreviado = "A22";
  const jornada = "Jornada";
  /*data need for mi class*/

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

module.exports = router;
