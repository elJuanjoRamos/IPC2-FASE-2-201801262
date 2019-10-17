var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//Important

var app = express();
var port = 3000;
var uri = '/api/v1/';

//Body-Parser Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Headers
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    if (req.methods == "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});


//Routes
var rolRoute = require('./app/routes/rol.routes');
var usuarioRoute = require('./app/routes/usuario.routes');
var cursoRoute = require('./app/routes/curso.routes');
var detcursoRoute = require('./app/routes/detalleCurso.routes');
var asigAuxiliar = require('./app/routes/asignacionAuxiliar.routes')
var authRoute = require('./app/routes/authenticate.routes');

//middlewares

app.use('/', authRoute);
app.use(uri, rolRoute);
app.use(uri, usuarioRoute);
app.use(uri, cursoRoute);
app.use(uri, detcursoRoute);
app.use(uri, asigAuxiliar);

app.listen(port, function() {
    console.log('El servidor corre en el puerto:' + port)
});