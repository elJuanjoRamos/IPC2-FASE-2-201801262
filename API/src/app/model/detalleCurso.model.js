var database = require('../../config/dbConnection');
var DETCURSO = {}


//Metodo GET, trae a todos los usuarios

DETCURSO.get = function(calback) {
    if (database) {
        var query = 'SELECT idDetalleCurso, semestre, anio, horaInicio, horaFin, Curso.nombre, Curso.codigo, ' +
            'seccion FROM DETALLECURSO INNER JOIN Curso on DetalleCurso.Curso_idCurso = Curso.idCurso;';
        database.query(query, function(error, resultado) {
            if (error) {
                throw error;
            } else {
                calback(resultado)
            }
        });
    }
}

DETCURSO.insert = function(data, callback) {
    if (database) {
        database.query('SELECT * FROM DETALLECURSO WHERE Curso_idCurso = ? AND seccion = ? AND horaInicio = ? AND horaFin = ?  AND semestre = ?', [data.Curso_idCurso, data.seccion,
                data.horaInicio, data.horaFin, data.semestre
            ],
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    if (resultado[0] == undefined) {
                        database.query('INSERT INTO DETALLECURSO(semestre, anio, horaInicio, horaFin, Curso_idCurso, seccion)' +
                            ' VALUES( ?,?, ?, ?, ?, ?)', [data.semestre, data.anio, data.horaInicio, data.horaFin, data.Curso_idCurso, data.seccion],
                            function(error, resultado) {
                                if (error) {
                                    throw error;
                                } else {
                                    callback({ "affectedRows": resultado.affectedRows });
                                }
                            });
                    } else {
                        callback({ "estado": false, "mensaje": "Ya existe un detalle con los mismos valores de curso, seccion, semestre y horario" });
                    }
                }
            });
    }
}

DETCURSO.select = function(id, callback) {
    if (database) {
        var consulta = 'SELECT * FROM DETALLECURSO WHERE idDetalleCurso = ?';
        database.query(consulta, id, function(error, resultado) {
            if (error) {
                throw error;
            } else {
                callback(resultado[0]);
            }
        });
    }
}


DETCURSO.delete = function(id, callback) {
    if (database) {
        var query = 'DELETE FROM DETALLECURSO WHERE idDetalleCurso =' + id
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
DETCURSO.update = function(data, callback) {
    if (database) {


        database.query('SELECT * FROM DETALLECURSO WHERE Curso_idCurso = ? AND seccion = ? AND horaInicio = ? AND horaFin = ?  AND semestre = ?', [data.Curso_idCurso, data.seccion,
                data.horaInicio, data.horaFin, data.semestre
            ],
            function(error, resultado) {
                if (error) {
                    throw error;
                } else {
                    if (resultado[0] == undefined) {
                        var query = 'UPDATE DETALLECURSO SET semestre = "' + data.semestre +
                            '", anio = "' + data.anio + '", horaInicio = "' + data.horaInicio + '", horaFin = "' + data.horaFin + '", seccion = "' + data.seccion +
                            '",  Curso_idCurso = ' + data.Curso_idCurso + ' WHERE idDetalleCurso =' + data.idDetalleCurso
                        database.query(query,
                            function(error, resultado) {
                                if (error) {
                                    throw error;
                                } else {
                                    callback({ "affectedRows": resultado.affectedRows });
                                }
                            });
                    } else {
                        callback({ "estado": false, "mensaje": "Ya existe un detalle con los mismos valores de curso, seccion, semestre y horario" });
                    }
                }
            });
    }
}


module.exports = DETCURSO;