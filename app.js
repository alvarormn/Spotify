'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//cargar rutas
const user_routes = require('./routes/user');
const artist_routes = require('./routes/artist');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http

//rutas base
app.use('/api/user', user_routes);
app.use('/api/artist', artist_routes);

module.exports = app;
