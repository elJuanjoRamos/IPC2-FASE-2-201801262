var express = require('express');
var asignacion = require('../model/asignacionAuxiliar.model')
var asignacionAuxiliarRoute = express();


//METODO GET
//get 
asignacionAuxiliarRoute.get('/ws/db/asignacionauxiliar', function(req, res) {
    asignacion.get(function(result) {
        if (typeof result != undefined) {
            res.json(result);
        } else {
            res.json({ messaje: "No data" });
        }
    });
});

//GET UNIC
asignacionAuxiliarRoute.get('/ws/db/asignacionauxiliar/:id', function(req, res) {
    var id = req.params.id;
    asignacion.select(id, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay Cursos" });
        }
    });
});

//post

asignacionAuxiliarRoute.post('/ws/db/asignacionauxiliar/', /*services.verificar,*/ function(req, res, next) {
    var data = {
        usuario: req.body.Usuario_idUsuario,
        detalle: req.body.Curso_idCurso
    };
    asignacion.insert(data, function(resultado) {
        if (resultado && resultado.affectedRows > 0) {
            res.json({
                estado: true,
                mensaje: "Se agrego el curso"
            });
        } else {
            res.json({ "mensaje": "No se ingreso el curso" });
        }
    });
});

//validar
asignacionAuxiliarRoute.post('/ws/db/verificar/', /*services.verificar,*/ function(req, res, next) {
    var data = {
        Usuario_idUsuario: req.body.Usuario_idUsuario,
        Detalle_idDetalle: req.body.Curso_idCurso
    };
    asignacion.verificar(data, function(resultado) {
        if (typeof resultado !== 'undefined') {
            res.json({ "estado": false, "mensaje": "Ya existe una asignacion con los datos proporcionados" });
        } else {
            res.json({ "estado": true, "mensaje": "No hay asignaciones con los datos proporcionados" });
        }
    });
});


//delete
asignacionAuxiliarRoute.delete('/ws/db/asignacionauxiliar/:id', function(req, res) {
    var id = req.params.id;
    asignacion.delete(id, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay cursos" });
        }
    });
});
//PUT
asignacionAuxiliarRoute.put('/ws/db/asignacionauxiliar/:id', /*services.verificar,*/ function(req, res, next) {
    var c = req.params.id;
    var data = {
        nombre: req.body.nombre,
        estado: req.body.estado,
        codigo: req.body.codigo,
        idCurso: c,

    }
    asignacion.update(data, function(resultado) {
        if (resultado && resultado.affectedRows > 0) {
            res.json({
                estado: true,
                mensaje: "Se ha modificado con exito"
            });
        } else {
            res.json({
                estado: false,
                mensaje: "No se pudo modificar"
            });
        }
    });
});



//METODO GET SECCIONES
//get 
asignacionAuxiliarRoute.get('/ws/db/seccion', function(req, res) {
    asignacion.getSecciones(function(result) {
        if (typeof result != undefined) {
            res.json(result);
        } else {
            res.json({ messaje: "No data" });
        }
    });
});

module.exports = asignacionAuxiliarRoute;