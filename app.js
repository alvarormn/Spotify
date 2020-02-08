'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http

//rutas base
app.use('/user_api', user_routes);



/*app.get('/pruebas', function(req,res){
  res.status(200).send({
    message: 'Hello world'
  })
})*/

module.exports = app;
