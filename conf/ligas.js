// configurar ligas y sus categorias

const ligas = {
    Ed: ["Libre", "Mixta", "Sub21" ,"Femenil" ],
    Aguigol: ["libre", "sub23"],
    Gemelas: ["libre", "mixta", "sub22"],
    Pro: ["libre", "mixta", "sub22"],
    Spartaq: ["libre", "mixta", "sub22"],
    vera: ["libre", "mixta", "sub22"]


  };
  
  const ligas_categorias = {
    StyleSheet: "index.less",
    Servidor: "http://localhost:8082/",
    Ligas: {
      Ed: {
        name_Key: "Ed",
        name: "Liga ED",
        jornada: "Jornada",
        categorias: [
          { name: "Libre", torneos: ["A23", "A22"] },
          { name: "Mixta", torneos: ["A23", "A22"] },
          { name: "Sub21", torneos: ["A23", "A22"] },
          { name: "Femenil", torneos: ["A23", "A22"] },
        ],
      },
      Aguigol: {
        name_Key: "Aguigol",
        name: "Aguigol",
        jornada: "Semana",
        categorias: [
          { name: "Libre", torneos: ["A23", "A22"] },
          { name: "Mixta", torneos: ["A23", "A22"] },
          { name: "Sub21", torneos: ["A23", "A22"] },
          { name: "Femenil", torneos: ["A23", "A22"] },
        ],
      },
      Gemelas: {
        name_Key: "Gemelas",
        name: "Liga Gemelas",
        jornada: "Jornada",
        categorias: [
          { name: "Libre", torneos: ["A23", "A22"] },
          { name: "Mixta", torneos: ["A23", "A22"] },
          { name: "Sub21", torneos: ["A23", "A22"] },
          { name: "Femenil", torneos: ["A23", "A22"] },
        ],
      },
      Pro: {
        name_Key: "Pro",
        name: "Pro Champions",
        jornada: "Semana",
        categorias: [
          { name: "Libre", torneos: ["A23", "A22"] },
          { name: "Mixta", torneos: ["A23", "A22"] },
          { name: "Sub21", torneos: ["A23", "A22"] },
          { name: "Femenil", torneos: ["A23", "A22"] },
        ],
      },
      Spartaq: {
        name_Key: "Spartaq",
        name: "Spartaq",
        jornada: "Semana",
        categorias: [
          { name: "Libre", torneos: ["A23", "A22"] },
          { name: "Mixta", torneos: ["A23", "A22"] },
          { name: "Sub21", torneos: ["A23", "A22"] },
          { name: "Femenil", torneos: ["A23", "A22"] },
        ],
      },
    },
  };
  module.exports = ligas_categorias;