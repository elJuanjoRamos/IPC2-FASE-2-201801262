var express = require('express');
var rol = require('../model/rol.model');
var rolRoutes = express.Router();

//get 
rolRoutes.get('/db/rol', function(req, res) {
    rol.getAll(function(result) {
        if (typeof result != undefined) {
            res.json(result);
        } else {
            res.json({ messaje: "No data" });
        }
    });
});

module.exports = rolRoutes;