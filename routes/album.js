'use strict'

const express = require('express');
const multipart = require('connect-multiparty');
const AlbumCtrl = require('../controllers/album');
const api = express.Router();
const md_auth = require('../middlewares/authenticate');
const md_upload = multipart({
  uploadDir: './uploads/album'
})

api.post('/registerAlbum', md_auth.ensureAuth, AlbumCtrl.saveAlbum);

module.exports = api;
