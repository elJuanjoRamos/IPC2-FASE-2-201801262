var express = require('express');
var curso = require('../model/curso.model')
var cursoRoute = express();


//METODO GET
//get 
cursoRoute.get('/ws/db/curso', function(req, res) {
    curso.get(function(result) {
        if (typeof result != undefined) {
            res.json(result);
        } else {
            res.json({ messaje: "No data" });
        }
    });
});
//GET UNIC
cursoRoute.get('/ws/db/curso/:id', function(req, res) {
    var id = req.params.id;
    curso.select(id, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay Cursos" });
        }
    });
});


//post

cursoRoute.post('/ws/db/curso/', /*services.verificar,*/ function(req, res, next) {
    var data = {
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        estado: req.body.estado
    };
    curso.insert(data, function(resultado) {
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

//delete
cursoRoute.delete('/ws/db/curso/:id', function(req, res) {
    var id = req.params.id;
    curso.delete(id, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay cursos" });
        }
    });
});
//PUT
cursoRoute.put('/ws/db/curso/:id', /*services.verificar,*/ function(req, res, next) {
    var c = req.params.id;
    var data = {
        nombre: req.body.nombre,
        estado: req.body.estado,
        codigo: req.body.codigo,
        idCurso: c,

    }
    curso.update(data, function(resultado) {
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
cursoRoute.get('/ws/db/seccion', function(req, res) {
    curso.getSecciones(function(result) {
        if (typeof result != undefined) {
            res.json(result);
        } else {
            res.json({ messaje: "No data" });
        }
    });
});

module.exports = cursoRoute;