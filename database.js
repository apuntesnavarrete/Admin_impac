const mysql = require('mysql');

const pool = mysql.createPool({
  host     : 'localhost',
       user     : 'root',
       password : 'toor',
       database : 'futbolce_zon58'
  // solo de uso local , modificar git ignore
});

pool.getConnection((error, connection) => {
  if (error) {
    console.error('Error al conectarse a la base de datos: ', error);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
  connection.release();
});

pool.query = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
        return;
      }

      connection.query(query, values, (error, results) => {
        connection.release();
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });
};

process.on('exit', () => {
  pool.end();
});

module.exports = pool;

