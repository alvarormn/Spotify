'use strict'

const express = require('express');
const multipart = require('connect-multiparty');
const AlbumCtrl = require('../controllers/album');
const api = express.Router();
const md_auth = require('../middlewares/authenticate');
const md_upload = multipart({
  uploadDir: './uploads/albums'
})

api.post('/registerAlbum', md_auth.ensureAuth, AlbumCtrl.saveAlbum);
api.get('/getAlbum/:id', md_auth.ensureAuth, AlbumCtrl.getAlbum);
api.get('/getAlbums/:artist?/:page?', md_auth.ensureAuth, AlbumCtrl.getAlbums);
api.put('/update/:id', md_auth.ensureAuth, AlbumCtrl.updateAlbum);
api.delete('/delete/:id', md_auth.ensureAuth, AlbumCtrl.deleteAlbum);
api.put('/updateImage/:id', [md_auth.ensureAuth, md_upload], AlbumCtrl.uploadImage);
api.get('/getAvatar/:imageFile', AlbumCtrl.getImageFile);

module.exports = api;
