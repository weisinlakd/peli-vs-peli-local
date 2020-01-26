const express = require('express');
var controlador = require('../controladores/controlador');
const app = express();

app.get("/generos", controlador.obtenerGeneros);

module.exports = app;