var express = require('express');
var usuario = require('../model/usuario.model')
var usuarioRoute = express();


//METODO GET
//get 
usuarioRoute.get('/ws/db/usuario', function(req, res) {
    usuario.get(function(result) {
        if (typeof result != undefined) {
            res.json(result);
        } else {
            res.json({ messaje: "No data" });
        }
    });
});
//GET UNIC
usuarioRoute.get('/ws/db/usuario/:idUsuario', function(req, res) {
    var idUsuario = req.params.idUsuario;

    usuario.select(idUsuario, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay usuarios" });
        }
    });
});


//post

usuarioRoute.post('/ws/db/usuario/', /*services.verificar,*/ function(req, res, next) {
    var data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        username: req.body.username,
        pass: req.body.password,
        idRol: req.body.Rol_idRol,
    };
    usuario.insert(data, function(resultado) {
        if (resultado && resultado.affectedRows > 0) {
            res.json({
                estado: true,
                mensaje: "Se agrego el usuario"
            });
        } else {
            res.json({ "mensaje": "No se ingreso el contacto" });
        }
    });
});

//delete
usuarioRoute.delete('/ws/db/usuario/:idUsuario', function(req, res) {
    var idUsuario = req.params.idUsuario;
    usuario.delete(idUsuario, function(resultado) {
        if (typeof resultado !== undefined) {
            res.json(resultado);
        } else {
            res.json({ "mensaje": "No hay usuarios" });
        }
    });
});
//PUT
usuarioRoute.put('/ws/db/usuario/:id', /*services.verificar,*/ function(req, res, next) {
    var c = req.params.id;
    var data = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        username: req.body.username,
        pass: req.body.password,
        rol: req.body.Rol_idRol,
        idUsuario: c,
    }
    usuario.update(data, function(resultado) {
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


module.exports = usuarioRoute;