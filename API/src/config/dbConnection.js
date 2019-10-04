var mysql = require('mysql');

var parameters = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    database: 'dbFase2',
    password: '1234'
}


var connection = mysql.createConnection(parameters);

if (connection) {
    console.log("Conexion establecida");
}

module.exports = connection;