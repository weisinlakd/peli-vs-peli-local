const express = require('express');
var controlador = require('../controladores/controlador');
const app = express();

app.get("/competencias", controlador.obtenerPreguntas);

app.post("/competencias", controlador.crearCompetencia);

app.get("/competencias/:id", controlador.buscarCompetenciaPorId);

app.delete("/competencias/:id", controlador.borrarCompetencia);

app.put("/competencias/:id", controlador.editarCompetencia);

app.get("/competencias/:id/peliculas", controlador.obtenerOpciones);

app.post("/competencias/:id/voto", controlador.manejarVoto);

app.delete("/competencias/:id/votos", controlador.borrarVotos);

app.get("/competencias/:id/resultados", controlador.obtenerResultados);


module.exports = app;