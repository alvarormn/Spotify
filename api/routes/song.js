'use strict'

const express = require('express');
const multipart = require('connect-multiparty');
const SongCtrl = require('../controllers/song');
const api = express.Router();
const md_auth = require('../middlewares/authenticate');
const md_upload = multipart({
  uploadDir: './uploads/songs'
})

api.post('/register', md_auth.ensureAuth, SongCtrl.saveSong);
api.get('/song/:id', md_auth.ensureAuth, SongCtrl.getSong);
api.get('/songs/:album?', md_auth.ensureAuth, SongCtrl.getSongs);
api.put('/update/:id', md_auth.ensureAuth, SongCtrl.updateSong);
api.delete('/delete/:id', md_auth.ensureAuth, SongCtrl.deleteSong);
api.put('/updateFile/:id', [md_auth.ensureAuth, md_upload], SongCtrl.uploadFile);
api.get('/getFile/:songFile', SongCtrl.getSongFile);

module.exports = api;
