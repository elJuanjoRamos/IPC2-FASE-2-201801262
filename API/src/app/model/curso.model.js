var database = require('../../config/dbConnection');
var CURSO = {}


//Metodo GET, trae a todos los usuarios

CURSO.get = function(calback) {
    if (database) {
        var query = 'SELECT * FROM CURSO ORDER BY estado DESC';
        database.query(query, function(error, resultado) {
            if (error) {
                throw error;
            } else {
                calback(resultado)
            }
        });
    }
}

CURSO.getActivo = function(calback) {
    if (database) {
        var query = 'SELECT * FROM CURSO WHERE estado = 1';
        database.query(query, function(error, resultado) {
            if (error) {
                throw error;
            } else {
                calback(resultado)
            }
        });
    }
}

CURSO.select = function(id, callback) {
    if (database) {
        var consulta = 'SELECT * FROM CURSO WHERE idCurso = ?';
        database.query(consulta, id, function(error, resultado) {
            if (error) {
                throw error;
            } else {
                callback(resultado[0]);
            }
        });
    }
}


//post
CURSO.insert = function(data, callback) {
    if (database) {
        console.log(data)
        var query = 'CALL insert_user(?, ?, ?, ?, ?)';
        database.query('INSERT INTO CURSO(nombre, codigo, estado) VALUES( ?,?, ?)', [data.nombre, data.codigo, data.estado],
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    callback({ "affectedRows": resultado.affectedRows });
                }
            });
    }
}

CURSO.delete = function(id, callback) {
    if (database) {
        var query1 = 'SELECT * FROM DetalleCurso WHERE Curso_idCurso = ' + id;
        database.query(query1,
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    if (resultado[0] == undefined) {
                        var query = 'DELETE FROM CURSO WHERE idCurso =' + id
                        database.query(query, function(err, res) {
                            if (err) {
                                throw err;
                            } else {
                                callback({ "estado": true, "mensaje": "Curso Eliminado" });
                            }
                        });
                    } else {
                        callback({ "estado": false, "mensaje": "No se puede eliminar el curso debido a que hay uno o mas detalles creados con el, elimine los detalles antes de eliminar el curso" });
                    }
                }
            });
    }
}

CURSO.update = function(data, callback) {
    if (database) {
        var query = 'UPDATE CURSO SET nombre = "' + data.nombre + '", codigo = "' + data.codigo + '", estado =' + data.estado + ' WHERE idCurso =' + data.idCurso
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

//Metodo GET, trae a todas las secciones

CURSO.getSecciones = function(calback) {
    if (database) {
        var query = 'SELECT * FROM Seccion';
        database.query(query, function(error, resultado) {
            if (error) {
                throw error;
            } else {
                calback(resultado)
            }
        });
    }
}


module.exports = CURSO;