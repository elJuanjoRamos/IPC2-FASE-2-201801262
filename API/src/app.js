var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//Important

var app = express();
var port = 3000;
var uri = '/api/v1/';

//Routes
var rolRoute = require('./app/routes/rol.routes');

//Vistas


//Body-Parser Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Headers
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Autorization');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});


//middlewares
app.use(uri, rolRoute);


app.listen(port, function() {
    console.log('El servidor corre en el puerto:' + port)
});