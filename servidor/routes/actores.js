const express = require('express');
var controlador = require('../controladores/controlador');
const app = express();

app.get("/actores", controlador.obtenerActores);

module.exports = app;