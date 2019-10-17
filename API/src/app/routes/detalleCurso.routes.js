var express = require('express');
var curso = require('../model/detalleCurso.model')
var cursoRoute = express();


//METODO GET
//get 
cursoRoute.get('/ws/db/detallecurso', function(req, res) {
    curso.get(function(result) {
        if (typeof result != undefined) {
            res.json(result);
        } else {
            res.json({ messaje: "No data" });
        }
    });
});
cursoRoute.get('/ws/db/detallecurso/:id', function(req, res) {
    var id = req.params.id;
    curso.select(id, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay Cursos" });
        }
    });
});


//delete
cursoRoute.delete('/ws/db/detallecurso/:id', function(req, res) {
    var id = req.params.id;
    curso.delete(id, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay cursos" });
        }
    });
});


//post
cursoRoute.post('/ws/db/detallecurso/', /*services.verificar,*/ function(req, res, next) {
    var data = {
        semestre: req.body.semestre,
        anio: req.body.anio,
        Curso_idCurso: req.body.Curso_idCurso,
        seccion: req.body.seccion,
        horaInicio: req.body.horaInicio,
        horaFin: req.body.horaFin
    };
    curso.insert(data, function(resultado) {
        if (resultado && resultado.affectedRows > 0) {
            res.json({
                estado: true,
                mensaje: "Se agrego el detalle"
            });
        } else {
            res.json({ "estado": false, "mensaje": "Ya existe un detalle con los mismos valores de curso, seccion y horario" });
        }
    });
});

cursoRoute.put('/ws/db/detallecurso/:id', /*services.verificar,*/ function(req, res, next) {
    var c = req.params.id;
    var data = {
        semestre: req.body.semestre,
        anio: req.body.anio,
        Curso_idCurso: req.body.Curso_idCurso,
        seccion: req.body.seccion,
        idDetalleCurso: c,
        horaInicio: req.body.horaInicio,
        horaFin: req.body.horaFin
    };
    console.log()
    curso.update(data, function(resultado) {
        if (resultado && resultado.affectedRows > 0) {
            res.json({
                estado: true,
                mensaje: "Se ha modificado con exito"
            });
        } else {
            res.json({
                estado: false,
                mensaje: "Ya existe un detalle con los mismos valores de curso, seccion y horario"
            });
        }
    });
});
module.exports = cursoRoute;