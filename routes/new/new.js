var express = require('express');
var router = express.Router();
const pool = require('../../database');

router.get('/', async(req, res, next)=> {
   
  
  res.render('new/agregar');
  });

  router.post('/', async(req, res, next)=> {
   
    let data_newCategoria = req.body;


  

   const liga = data_newCategoria.liga;
   const categoria = data_newCategoria.Categoria;
   const torneo = data_newCategoria.Torneo;
   
console.log(liga)

   const consulta = `CREATE TABLE \`futbolce_zon58\`.\`${liga}_${categoria}_${torneo}\` (
       \`Jornada\` ENUM('1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28') NOT NULL COLLATE 'utf8mb3_spanish_ci',
       \`Equipo\` INT(10) NOT NULL,
       \`GF\` INT(10) NOT NULL,
       \`GC\` INT(10) NOT NULL,
       \`Puntos\` INT(10) NOT NULL,
       \`Rival\` INT(10) NOT NULL,
       \`Fecha\` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb3_spanish_ci',
       \`ID\` INT(10) NOT NULL AUTO_INCREMENT,
       \`hora\` VARCHAR(9) NULL DEFAULT NULL COLLATE 'utf8mb3_spanish_ci',
       PRIMARY KEY (\`ID\`) USING BTREE,
       INDEX \`mx20ed\` (\`Equipo\`) USING BTREE,
       INDEX \`mx20edrival\` (\`Rival\`) USING BTREE,
       FOREIGN KEY (\`Equipo\`) REFERENCES \`futbolce_zon58\`.\`registros global equipo heroes\` (\`id_plantel\`) ON UPDATE CASCADE ON DELETE CASCADE,
       FOREIGN KEY (\`Rival\`) REFERENCES \`futbolce_zon58\`.\`registros global equipo heroes\` (\`id_plantel\`) ON UPDATE NO ACTION ON DELETE CASCADE
   )
    COLLATE 'utf8mb3_spanish_ci' ENGINE=InnoDB ROW_FORMAT=Dynamic AUTO_INCREMENT=0;`;
   
   
    
    const consulta_vista_general = `CREATE VIEW ${liga}_general_${categoria}_${torneo} AS 
    SELECT \`Registros Global Equipo Heroes\`.\`Escudo\` AS \`Escudo\`
    ,\`Registros Global Equipo Heroes\`.\`Nombre_Equipo\` AS \`Equipo\`
    ,sum(\`Puntos\`) AS \`Puntos\`
    ,\`Registros Global Equipo Heroes\`.\`id_plantel\` AS \`ID\`
    ,sum(\`${liga}_${categoria}_${torneo}\`.\`GF\`) AS \`GF\`
    ,sum(\`${liga}_${categoria}_${torneo}\`.\`GC\`) AS \`GC\`
    ,sum(\`GF\` - \`GC\`) AS \`DFG\`
    ,count(\`${liga}_${categoria}_${torneo}\`.\`ID\`) AS \`PJ\` 
    FROM \`Registros Global Equipo Heroes\`
    INNER JOIN ${liga}_${categoria}_${torneo}
    ON \`Registros Global Equipo Heroes\`.\`id_plantel\` = ${liga}_${categoria}_${torneo}.\`Equipo\`
    group by \`Registros Global Equipo Heroes\`.\`id_plantel\`
    ORDER BY puntos DESC , DFG DESC`;
    
    
    const consulta_zjor = `CREATE VIEW z${liga}_jor_${categoria}_${torneo} AS 
    select \`${liga}_${categoria}_${torneo}\`.\`Jornada\` AS \`Jornada\`
    ,\`${liga}_${categoria}_${torneo}\`.\`Equipo\` AS \`Equipo\`
    ,\`${liga}_${categoria}_${torneo}\`.\`GF\` AS \`GF\`
    ,\`${liga}_${categoria}_${torneo}\`.\`GC\` AS \`GC\`
    ,\`${liga}_${categoria}_${torneo}\`.\`Puntos\` AS \`Puntos\`
    ,\`${liga}_${categoria}_${torneo}\`.\`Rival\` AS \`Rival\`
    ,\`${liga}_${categoria}_${torneo}\`.\`Fecha\` AS \`Fecha\`
    ,\`${liga}_${categoria}_${torneo}\`.\`ID\` AS \`ID\`
    ,\`Registros Global Equipo Heroes\`.\`id_plantel\` AS \`idlc\`
    ,\`Registros Global Equipo Heroes\`.\`Nombre_Equipo\` AS \`Equipolc\`
    ,\`Registros Global Equipo Heroes\`.\`Delegado\` AS \`Delegadolc\`
    ,\`Registros Global Equipo Heroes\`.\`Escudo\` AS \`Escudolc\`
    ,\`Registros Global Equipo Heroes\`.\`Fecha_Registro\` AS \`Fecha_Registrolc\` 
    from (\`${liga}_${categoria}_${torneo}\` join \`Registros Global Equipo Heroes\` 
    on((\`${liga}_${categoria}_${torneo}\`.\`Equipo\` = \`Registros Global Equipo Heroes\`.\`id_plantel\`)))`;
    
    const consulta_jor = `
    CREATE VIEW ${liga}_jor_${categoria}_${torneo} AS  
    SELECT
        \`z${liga}_jor_${categoria}_${torneo}\`.\`Jornada\` AS \`Jornada\`,
        \`z${liga}_jor_${categoria}_${torneo}\`.\`Equipo\` AS \`Equipo\`,
        \`z${liga}_jor_${categoria}_${torneo}\`.\`GF\` AS \`GF\`,
        \`z${liga}_jor_${categoria}_${torneo}\`.\`GC\` AS \`GC\`,
        \`z${liga}_jor_${categoria}_${torneo}\`.\`Puntos\` AS \`Puntos\`,
        \`z${liga}_jor_${categoria}_${torneo}\`.\`Rival\` AS \`Rival\`,
        \`z${liga}_jor_${categoria}_${torneo}\`.\`Fecha\` AS \`Fecha\`,
        \`z${liga}_jor_${categoria}_${torneo}\`.\`ID\` AS \`ID\`,
        \`z${liga}_jor_${categoria}_${torneo}\`.\`idlc\` AS \`idlc\`,
        \`z${liga}_jor_${categoria}_${torneo}\`.\`Equipolc\` AS \`Equipolc\`,
        \`z${liga}_jor_${categoria}_${torneo}\`.\`Delegadolc\` AS \`Delegadolc\`,
        \`z${liga}_jor_${categoria}_${torneo}\`.\`Escudolc\` AS \`Escudolc\`,
        \`z${liga}_jor_${categoria}_${torneo}\`.\`Fecha_Registrolc\` AS \`Fecha_Registrolc\`,
        \`Registros Global Equipo Heroes\`.\`id_plantel\` AS \`id_plantel\`,
        \`Registros Global Equipo Heroes\`.\`Nombre_Equipo\` AS \`Nombre_Equipo\`,
        \`Registros Global Equipo Heroes\`.\`Delegado\` AS \`Delegado\`,
        \`Registros Global Equipo Heroes\`.\`Escudo\` AS \`Escudo\`,
        \`Registros Global Equipo Heroes\`.\`Fecha_Registro\` AS \`Fecha_Registro\`
    FROM 
        (\`z${liga}_jor_${categoria}_${torneo}\` JOIN \`Registros Global Equipo Heroes\` 
        ON (\`z${liga}_jor_${categoria}_${torneo}\`.\`Rival\` = \`Registros Global Equipo Heroes\`.\`id_plantel\`))
    `;
    

    let consulta_c_planteles = `CREATE TABLE \`futbolce_zon58\`.\`${liga}_planteles_${categoria}_${torneo}\` (
      \`ID\` INT(10) NOT NULL,
      \`Equipo\` INT(10) NULL DEFAULT NULL,
      \`Torneo\` VARCHAR(15) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
      \`Dorsal\` INT(10) NULL DEFAULT NULL,
      \`ID_INGRESO\` INT(10) NOT NULL,
      PRIMARY KEY (\`ID_INGRESO\`) USING BTREE,
      INDEX \`ID\` (\`ID\`) USING BTREE,
      INDEX \`Equipo\` (\`Equipo\`) USING BTREE,
      FOREIGN KEY (\`ID\`) REFERENCES \`futbolce_zon58\`.\`registro global heroes\` (\`ID_FB\`) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY (\`Equipo\`) REFERENCES \`futbolce_zon58\`.\`registros global equipo heroes\` (\`id_plantel\`) ON UPDATE CASCADE ON DELETE CASCADE
  )
   COLLATE 'latin1_swedish_ci' ENGINE=InnoDB ROW_FORMAT=Dynamic;`;
  

const consulta_zplanteles = `CREATE VIEW z${liga}_Planteles_${categoria}_${torneo} AS 
select \`${liga}_planteles_${categoria}_${torneo}\`.\`ID\` AS \`ID\`
,\`${liga}_planteles_${categoria}_${torneo}\`.\`Equipo\` AS \`Equipo\`
,\`${liga}_planteles_${categoria}_${torneo}\`.\`Torneo\` AS \`Torneo\`
,\`${liga}_planteles_${categoria}_${torneo}\`.\`Dorsal\` AS \`Dorsal\`
,\`${liga}_planteles_${categoria}_${torneo}\`.\`ID_INGRESO\` AS \`ID_INGRESO\`
,\`Registro Global Heroes\`.\`ID_FB\` AS \`ID_FB\`
,\`Registro Global Heroes\`.\`Nombres\` AS \`Nombres\`
,\`Registro Global Heroes\`.\`Apellido_Paterno\` AS \`Apellido_Paterno\`
,\`Registro Global Heroes\`.\`Apellido_Materno\` AS \`Apellido_Materno\`
,\`Registro Global Heroes\`.\`Fecha_Nacimiento\` AS \`Fecha_Nacimiento\`
,\`Registro Global Heroes\`.\`Curp\` AS \`Curp\`
,\`Registro Global Heroes\`.\`Foto\` AS \`Foto\` 
from (\`${liga}_planteles_${categoria}_${torneo}\` join \`Registro Global Heroes\` on((\`ed_planteles_${categoria}_${torneo}\`.\`ID\` = \`Registro Global Heroes\`.\`ID_FB\`)))`;

const consulta_planteles = `CREATE VIEW ${liga}_planteles_${categoria}_${torneo}_v AS 
select \`z${liga}_Planteles_${categoria}_${torneo}\`.\`ID\` AS \`ID\`,
\`z${liga}_Planteles_${categoria}_${torneo}\`.\`Equipo\` AS \`Equipo\`,
\`z${liga}_Planteles_${categoria}_${torneo}\`.\`Torneo\` AS \`Torneo\`,
\`z${liga}_Planteles_${categoria}_${torneo}\`.\`Dorsal\` AS \`Dorsal\`,
\`z${liga}_Planteles_${categoria}_${torneo}\`.\`ID_INGRESO\` AS \`ID_INGRESO\`,
\`z${liga}_Planteles_${categoria}_${torneo}\`.\`ID_FB\` AS \`ID_FB\`,
\`z${liga}_Planteles_${categoria}_${torneo}\`.\`Nombres\` AS \`Nombres\`,
\`z${liga}_Planteles_${categoria}_${torneo}\`.\`Apellido_Paterno\` AS \`Apellido_Paterno\`,
\`z${liga}_Planteles_${categoria}_${torneo}\`.\`Apellido_Materno\` AS \`Apellido_Materno\`,
\`z${liga}_Planteles_${categoria}_${torneo}\`.\`Fecha_Nacimiento\` AS \`Fecha_Nacimiento\`,
\`z${liga}_Planteles_${categoria}_${torneo}\`.\`Curp\` AS \`Curp\`,
\`z${liga}_Planteles_${categoria}_${torneo}\`.\`Foto\` AS \`Foto\`,
\`Registros Global Equipo Heroes\`.\`id_plantel\` AS \`id_plantel\`,
\`Registros Global Equipo Heroes\`.\`Nombre_Equipo\` AS \`Nombre_Equipo\`,
\`Registros Global Equipo Heroes\`.\`Delegado\` AS \`Delegado\`,
\`Registros Global Equipo Heroes\`.\`Escudo\` AS \`Escudo\`,
\`Registros Global Equipo Heroes\`.\`Fecha_Registro\` AS \`Fecha_Registro\` 
from (\`z${liga}_Planteles_${categoria}_${torneo}\` join \`Registros Global Equipo Heroes\` on((\`z${liga}_Planteles_${categoria}_${torneo}\`.\`Equipo\` = \`Registros Global Equipo Heroes\`.\`id_plantel\`)))`;



let consulta_goleo = "CREATE TABLE `futbolce_zon58`.`" + liga + "_" + categoria + "_" + torneo + "_goles` (" +
    "`id` INT(10) NOT NULL," +
    "`Equipo` INT(10) NULL DEFAULT NULL," +
    "`Goles` INT(10) NULL DEFAULT NULL," +
    "`Asistencia` INT(10) UNSIGNED NULL DEFAULT NULL," +
    "`ID_Partido` INT(10) NULL DEFAULT NULL," +
    "`id_registro` INT(10) NOT NULL AUTO_INCREMENT," +
    "PRIMARY KEY (`id_registro`) USING BTREE," +
    "INDEX `fgsdf` (`Equipo`) USING BTREE," +
    "INDEX `erwed` (`id`) USING BTREE," +
    "FOREIGN KEY (`id`) REFERENCES `futbolce_zon58`.`registro global heroes` (`ID_FB`) ON UPDATE CASCADE ON DELETE CASCADE," +
    "FOREIGN KEY (`Equipo`) REFERENCES `futbolce_zon58`.`registros global equipo heroes` (`id_plantel`) ON UPDATE CASCADE ON DELETE CASCADE" +
    ")" +
    "COLLATE 'utf8mb4_spanish_ci' ENGINE=InnoDB ROW_FORMAT=Dynamic AUTO_INCREMENT=0;";





   await pool.query(consulta)
   await pool.query(consulta_vista_general)
   await pool.query(consulta_zjor)
   await pool.query(consulta_jor)
   await pool.query(consulta_c_planteles)
   await pool.query(consulta_zplanteles)
   await pool.query(consulta_planteles)
   await pool.query(consulta_goleo)


    res.send("imprimir data");
    });

  module.exports = router;