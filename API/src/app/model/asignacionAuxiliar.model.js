var database = require('../../config/dbConnection');
var ASIGNACION = {}


//Metodo GET, trae a todos los usuarios

ASIGNACION.get = function(calback) {
    if (database) {
        var query = 'SELECT idAsignacionAuxiliar, Usuario.nombre, Usuario.apellido, semestre, anio, horaInicio, horaFin, Curso.nombre as curso, Curso.codigo,  seccion FROM AsignacionAuxiliar ' +
            ' INNER JOIN Usuario ON AsignacionAuxiliar.Usuario_idUsuario = Usuario.idUsuario' +
            ' INNER JOIN DetalleCurso ON AsignacionAuxiliar.DetalleCurso_idDetalleCurso = DetalleCurso.idDetalleCurso' +
            ' INNER JOIN Curso on DetalleCurso.Curso_idCurso = Curso.idCurso;';
        database.query(query, function(error, resultado) {
            if (error) {
                throw error;
            } else {
                calback(resultado)
            }
        });
    }
}

ASIGNACION.select = function(id, callback) {
    if (database) {
        var consulta = 'SELECT * FROM ASIGNACION WHERE idCurso = ?';
        database.query(consulta, id, function(error, resultado) {
            if (error) {
                throw error;
            } else {
                callback(resultado[0]);
            }
        });
    }
}


ASIGNACION.verificar = function(data, callback) {
    if (database) {
        var consulta = 'SELECT * FROM AsignacionAuxiliar WHERE Usuario_idUsuario = ? AND DetalleCurso_idDetalleCurso = ?';
        database.query(consulta, [data.Usuario_idUsuario, data.Detalle_idDetalle], function(error, resultado) {
            if (error) {
                throw error;
            } else {
                callback(resultado[0]);
            }
        });
    }
}


//post
ASIGNACION.insert = function(data, callback) {
    if (database) {
        console.log(data)
        database.query('INSERT INTO AsignacionAuxiliar(Usuario_idUsuario, DetalleCurso_idDetalleCurso) VALUES( ?,?)', [data.usuario, data.detalle],
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    callback({ "affectedRows": resultado.affectedRows });
                }
            });
    }
}

ASIGNACION.delete = function(id, callback) {
    if (database) {
        var query = 'DELETE FROM AsignacionAuxiliar WHERE idAsignacionAuxiliar =' + id
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

ASIGNACION.update = function(data, callback) {
    if (database) {
        var query = 'UPDATE ASIGNACION SET nombre = "' + data.nombre + '", codigo = "' + data.codigo + '", estado =' + data.estado + ' WHERE idCurso =' + data.idCurso
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


module.exports = ASIGNACION;