var database = require('../../config/dbConnection');
var USUARIO = {}


//Metodo GET, trae a todos los usuarios

USUARIO.get = function(calback) {
        if (database) {
            var query = 'SELECT * FROM USUARIO ORDER BY Rol_idRol ASC';
            database.query(query, function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    calback(resultado)
                }
            });
        }
    }
    //GET
USUARIO.select = function(idUsuario, callback) {
    if (database) {
        var consulta = 'SELECT * FROM Usuario WHERE idUsuario = ?';
        database.query(consulta, idUsuario, function(error, resultado) {
            if (error) {
                throw error;
            } else {
                callback(resultado[0]);
            }
        });
    }
}

//Trae a todos los auxiliares

USUARIO.getAux = function(calback) {
        if (database) {
            var query = 'SELECT * FROM USUARIO WHERE Rol_idRol = 2';
            database.query(query, function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    calback(resultado)
                }
            });
        }
    }
    //post
USUARIO.insert = function(data, callback) {
    if (database) {
        var query = 'CALL insert_user(?, ?, ?, ?, ?)';
        database.query('INSERT INTO Usuario(nombre, apellido, username, pass, Rol_idRol) VALUES( ?,?,?,?,? )', [data.nombre, data.apellido, data.username, data.pass, data.idRol],
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    callback({ "affectedRows": resultado.affectedRows });
                }
            });
    }
}

USUARIO.delete = function(id, callback) {
    if (database) {
        var query = 'DELETE FROM USUARIO WHERE idUsuario =' + id
        database.query(query,
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    callback({ "mensaje": "Eliminado" });
                }
            });
    }
}

USUARIO.update = function(data, callback) {
    if (database) {
        var query = 'UPDATE USUARIO SET nombre = "' + data.nombre + '", apellido = "' + data.apellido + '", username = "' +
            data.username + '", pass="' + data.pass + '", Rol_idRol = ' + data.rol + ' WHERE idUsuario =' + data.idUsuario
        var query2 = 'CALL actualizar_usuario("' + data.nombre + '","' + data.apellido + '","' +
            data.username + '","' + data.pass + '",' + data.rol + ',' + data.idUsuario + ')'
        database.query(query,
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    callback(resultado[0]);
                }
            });
    }
}

USUARIO.login = function(data, callback) {
    if (database) {
        var consulta = 'CALL autenticar(?, ?)';
        database.query(consulta, [data.username, data.password], function(error, resultado) {
            if (error) {
                throw error;
            } else {
                if (resultado[0].length > 0) {
                    callback(resultado[0]);
                } else {
                    callback(0);
                }
            }
        });
    }
}

module.exports = USUARIO;