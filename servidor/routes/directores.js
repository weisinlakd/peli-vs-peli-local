var express = require('express');
var controlador = require('../controladores/controlador');
var app = express();


app.get("/directores", controlador.obtenerDirectores);


module.exports = app;