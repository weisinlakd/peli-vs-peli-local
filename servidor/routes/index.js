const express = require('express');

const app = express();

app.use(require('./competencias'));
app.use(require('./generos'));
app.use(require('./directores'));
app.use(require('./actores'));


module.exports = app;