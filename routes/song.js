'use strict'

const express = require('express');
const multipart = require('connect-multiparty');
const SongCtrl = require('../controllers/song');
const api = express.Router();
const md_auth = require('../middlewares/authenticate');
const md_upload = multipart({
  uploadDir: './uploads/song'
})

api.post('/registerSong', md_auth.ensureAuth, SongCtrl.saveSong);

module.exports = api;
