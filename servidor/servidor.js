//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controlador = require('./controladores/controlador');
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


// prueba db
app.get("/competencias", controlador.obtenerPreguntas);

app.post("/competencias", controlador.crearCompetencia);

app.get("/competencias/:id", controlador.buscarCompetenciaPorId);

app.delete("/competencias/:id", controlador.borrarCompetencia);

app.put("/competencias/:id", controlador.editarCompetencia);

app.get("/competencias/:id/peliculas", controlador.obtenerOpciones);

app.post("/competencias/:id/voto", controlador.manejarVoto);

app.delete("/competencias/:id/votos", controlador.borrarVotos);

app.get("/competencias/:id/resultados", controlador.obtenerResultados);

app.get("/generos", controlador.obtenerGeneros);

app.get("/directores", controlador.obtenerDirectores);

app.get("/actores", controlador.obtenerActores);
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

