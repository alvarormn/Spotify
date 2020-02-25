'use strict'

//ruta de usuarios

const express = require('express');
const multipart = require('connect-multiparty')

const UserController = require('../controllers/user');
const md_auth = require('../middlewares/authenticate')

const api = express.Router();

const md_upload = multipart({
  uploadDir: './uploads/users'
})

api.get('/testingController', md_auth.ensureAuth, UserController.test);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update/:id', md_auth.ensureAuth, UserController.updateUser);
api.put('/updateImage/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/getAvatar/:imageFile', UserController.getImageFile)

module.exports = api;
