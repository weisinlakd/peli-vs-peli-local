require('./config/config');


//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// var controlador = require('./controladores/controlador');
var app = express();
const path = require('path');


app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use( express.static( path.resolve( __dirname , '../cliente/') ) );


app.use( require('./routes/index'));

// prueba db



app.listen(process.env.PORT, function () {
  console.log( "Escuchando en el puerto " + process.env.PORT );
});

console.log(process.env.HOST,
  process.env.PORT_SQL,
  process.env.USER,
  process.env.PASSWORD,
  process.env.DATABASE
)