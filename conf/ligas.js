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
    Menu_jugadores: "Jugadores",
    Menu_Equipos: "Equipos",
    Menu_Sancionados : "Sancionados",
    Servidor: "http://localhost:8082/",
    Ligas: {
      Ed: {
        name_Key: "Ed",
        name: "Liga ED",
        jornada: "Jornada",
        categorias: [
          { name: "Libre", torneos: ["A23","C22", "A22"] },
          { name: "Mixta", torneos: ["C22", "A22"] },
          { name: "Sub23", torneos: ["A23", "A22"] },
          { name: "Sub20", torneos: ["A23", "A22"] },

          { name: "Sub21", torneos: ["A23", "A22"] },
          { name: "Femenil", torneos: ["C22", "A22"] },
        ],
      },
      Aguigol: {
        name_Key: "Aguigol",
        name: "Aguigol",
        jornada: "Semana",
        categorias: [
          { name: "Libre", torneos: ["A23","C22","C22", "A22"] },
          { name: "Sub23", torneos: ["A23","C23","A22"] },
          { name: "mixta", torneos: ["A23","C23","A22"] },

        ],
      },
      Gemelas: {
        name_Key: "Gemelas",
        name: "Liga Gemelas",
        jornada: "Jornada",
        categorias: [
          { name: "Libre", torneos: ["A23", "A22"] },
          { name: "Mixta", torneos: ["A23", "A22"] },
        ],
      },
      Pro: {
        name_Key: "Pro",
        name: "Pro Champions",
        jornada: "Semana",
        categorias: [
          { name: "Libre", torneos: ["A23", "A22"] },
          { name: "Libre_Platino", torneos: ["A23"] },

          { name: "Mixta", torneos: ["C22", "A22"] },
          { name: "Sub22", torneos: ["A23", "C22"] },
          { name: "Femenil", torneos: ["A23","C22", "A22"] },
          { name: "Sub18", torneos: ["C22", "A22"] },
          { name: "Sub20", torneos: ["A23"] },

        ],
      },
    },
  };
  module.exports = ligas_categorias;