'use strict'

//ruta de usuarios

var express = require('express');
var multipart = require('connect-multiparty')

var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticate')

var api = express.Router();

var md_upload = multipart({
  uploadDir: './uploads/users'
})

api.get('/testingController', md_auth.ensureAuth, UserController.test);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update/:id', md_auth.ensureAuth, UserController.updateUser);
api.put('/updateImage/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/getAvatar/:imageFile', UserController.getImageFile)

module.exports = api;
