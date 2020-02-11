'use strict'

//ruta de usuarios

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/testingController', UserController.test);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser)

module.exports = api;
