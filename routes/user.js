'use strict'

//ruta de usuarios

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticate')

var api = express.Router();

api.get('/testingController', md_auth.ensureAuth, UserController.test);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser)

module.exports = api;
